import React, { useState, useRef, useEffect } from 'react';

/**
 * Controlled input bar for typing and sending chat messages.
 * Blocks empty or whitespace-only messages and disables during loading.
 * @param {{ onSendMessage: (text: string) => void, isLoading: boolean }} props
 */
export default function ChatInput({ onSendMessage, isLoading }) {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    onSendMessage(trimmed);
    setInputText('');
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="chat-input-form__field"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={isLoading ? 'Movie Assistant is replying...' : 'Ask about movies, TV shows, actors, plots...'}
        disabled={isLoading}
        aria-label="Chat input message"
      />
      <button
        type="submit"
        className="chat-input-form__submit"
        disabled={isLoading || !inputText.trim()}
        aria-label="Send message"
      >
        <span>Send</span>
        <span aria-hidden="true">➤</span>
      </button>
    </form>
  );
}
