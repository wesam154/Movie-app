import React, { useState } from 'react';
import ChatWindow from '../components/chat/ChatWindow.jsx';
import { sendMessageToAI } from '../services/aiApi.js';

const INITIAL_GREETING = {
  role: 'assistant',
  content: "Hello! I'm your AI Movie & TV Assistant 🎬. I can help you find movie and TV recommendations, explain plots, explore director filmographies, or discuss your favorite actors.\n\nWhat are you in the mood to watch or discuss today?"
};

export default function AIAssistant() {
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async (userText) => {
    if (!userText.trim() || isLoading) return;

    const userMessage = { role: 'user', content: userText.trim() };
    const updatedHistory = [...messages, userMessage];

    // 1. Append user message immediately
    setMessages(updatedHistory);
    // 2. Clear any prior error and set loading
    setError(null);
    setIsLoading(true);

    try {
      // 3. Send full conversation history to Groq AI
      const aiReply = await sendMessageToAI(updatedHistory);

      // 4. Append AI reply on success
      setMessages((prev) => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (err) {
      // 5. Show inline error without wiping previous conversation history
      setError(
        err?.message || 'Unable to connect to the Movie Assistant. Please check your network and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <div className="page-container ai-assistant-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>AI Movie Assistant</h1>
          <p className="page-note">
            Your personal cinema & TV concierge. Ask for recommendations, actor trivia, watch orders, and storyline summaries.
          </p>
        </div>
        {messages.length > 1 && (
          <button
            type="button"
            onClick={() => {
              setMessages([INITIAL_GREETING]);
              setError(null);
            }}
            style={{
              padding: '8px 14px',
              background: '#ffffff',
              border: '1px solid #ddd',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              fontWeight: '500'
            }}
          >
            Clear Conversation
          </button>
        )}
      </div>

      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSendMessage={handleSendMessage}
        onDismissError={handleDismissError}
      />
    </div>
  );
}
