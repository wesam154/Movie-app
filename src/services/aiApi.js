import { MOVIE_ASSISTANT_SYSTEM_PROMPT } from '../constants/aiPrompt.js';

// Groq API Key: supports Vite env variable with hardcoded fallback
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY ;

const GROQ_CHAT_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODELS_ENDPOINT = 'https://api.groq.com/openai/v1/models';

// Prioritized candidate models list.
// Standard accounts will resolve llama-3.3-70b-versatile or llama-3.1-8b-instant.
// Accounts/keys provisioned on regional/partner clusters will resolve qwen or gpt-oss.
const CANDIDATE_MODELS = [
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'qwen/qwen3.8-27b',
  'openai/gpt-oss-120b',
  'allam-2-7b'
];

let cachedWorkingModel = null;

/**
 * Discovers the best available chat model for the current API key.
 * Caches the result in memory so /models is only queried once.
 */
async function resolveModel(apiKey) {
  if (cachedWorkingModel) return cachedWorkingModel;

  try {
    const res = await fetch(GROQ_MODELS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      const availableIds = new Set((data.data || []).map((m) => m.id));

      for (const model of CANDIDATE_MODELS) {
        if (availableIds.has(model)) {
          cachedWorkingModel = model;
          return model;
        }
      }
    }
  } catch (err) {
    console.warn('Could not query Groq models list, falling back to candidate list:', err);
  }

  // Default fallback if /models could not be reached
  return 'qwen/qwen3.8-27b';
}

/**
 * Sends conversation history to the Groq API and returns the AI's response text.
 * Implements automatic fallback across candidate models if a model is unavailable.
 * @param {Array<{role: string, content: string}>} conversationHistory
 * @returns {Promise<string>}
 */
export async function sendMessageToAI(conversationHistory = []) {
  const apiKey = (GROQ_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error('Groq API Key is missing. Please provide a valid API key.');
  }

  // Sanitize conversation history to only include standard role and content
  const sanitizedHistory = conversationHistory.map(({ role, content }) => ({
    role: role === 'user' ? 'user' : 'assistant',
    content: String(content || '')
  }));

  const messages = [
    { role: 'system', content: MOVIE_ASSISTANT_SYSTEM_PROMPT },
    ...sanitizedHistory
  ];

  // Determine starting model based on key capabilities
  const preferredModel = await resolveModel(apiKey);

  // Build the list of models to try (preferred first, then remaining candidates)
  const modelsToTry = [
    preferredModel,
    ...CANDIDATE_MODELS.filter((m) => m !== preferredModel)
  ];

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const response = await fetch(GROQ_CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        let errorMessage = `API error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData?.error?.message) {
            errorMessage = errorData.error.message;
          }
        } catch {
          // ignore json parse error
        }

        // If the model is not accessible or doesn't exist on this account, try next candidate
        if (
          errorMessage.includes('does not exist') ||
          errorMessage.includes('do not have access') ||
          response.status === 404
        ) {
          lastError = new Error(errorMessage);
          continue;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;

      if (!reply) {
        throw new Error('Received an empty response from the AI assistant.');
      }

      // Remember working model for future calls
      cachedWorkingModel = model;
      return reply;
    } catch (err) {
      lastError = err;
      // If network error or fatal error other than model-access, throw immediately
      if (
        !err.message.includes('does not exist') &&
        !err.message.includes('do not have access')
      ) {
        throw err;
      }
    }
  }

  throw lastError || new Error('Failed to obtain a response from any available AI model.');
}
