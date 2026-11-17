import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import ChatInput from './ChatInput.jsx';
import './Chat.css';

const SUGGESTED_PROMPTS = [
  '🎬 Recommend a mind-bending thriller',
  '🍿 Best Christopher Nolan movies to watch',
  '📺 What are top-rated binge-worthy TV series?',
  '🔍 Explain the plot twist of Shutter Island'
];

/**
 * ChatWindow container component.
 * Manages the message list, auto-scrolling, typing state, inline error, and input bar.
 */
export default function ChatWindow({
  messages = [],
  isLoading = false,
  error = null,
  onSendMessage,
  onDismissError
}) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages change or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="chat-window">
      {/* Chat Window Header */}
      <div className="chat-header">
        <div className="chat-header__title">
          <div className="chat-header__icon" aria-hidden="true">🎬</div>
          <div>
            <h2 className="chat-header__name">AI Movie & TV Guide</h2>
            <div className="chat-header__status">
              <span className="chat-header__status-dot" />

            </div>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="chat-messages" role="log" aria-live="polite">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Inline Error Alert if any */}
      {error && (
        <div className="chat-error" role="alert">
          <span>⚠️ {error}</span>
          {onDismissError && (
            <button
              type="button"
              className="chat-error__close"
              onClick={onDismissError}
              aria-label="Dismiss error"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Quick Prompt Suggestion Chips */}
      <div className="chat-suggestions">
        {SUGGESTED_PROMPTS.map((prompt, index) => (
          <button
            key={index}
            type="button"
            className="chat-suggestions__chip"
            disabled={isLoading}
            onClick={() => onSendMessage(prompt.replace(/^[^\w]+/, ''))}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
}
