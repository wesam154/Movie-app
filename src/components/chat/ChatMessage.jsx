import React from 'react';

/**
 * Renders an individual chat message bubble.
 * User messages align to the right, AI assistant messages align to the left with movie theme.
 * @param {{ message: { role: 'user' | 'assistant', content: string } }} props
 */
export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-message ${isUser ? 'chat-message--user' : 'chat-message--assistant'}`}>
      <div className="chat-message__avatar" aria-hidden="true">
        {isUser ? '👤' : '🎬'}
      </div>

      <div className="chat-message__content-wrap">
        <span className="chat-message__author">
          {isUser ? 'You' : 'Movie Assistant'}
        </span>
        <div className="chat-message__bubble">
          {message.content}
        </div>
      </div>
    </div>
  );
}
