import React from 'react';

/**
 * Clean typing indicator shown while awaiting the AI's response.
 */
export default function TypingIndicator() {
  return (
    <div className="typing-indicator" aria-label="Movie Assistant is thinking">
      <div className="chat-message__avatar" aria-hidden="true">
        🎬
      </div>
      <div className="typing-indicator__bubble">
        <span className="typing-indicator__dot" />
        <span className="typing-indicator__dot" />
        <span className="typing-indicator__dot" />
        <span className="typing-indicator__label">Thinking...</span>
      </div>
    </div>
  );
}
