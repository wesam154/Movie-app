import React from 'react'
import './EmptyState.css'

// Generic "no data" placeholder — takes a message and an optional button,
// e.g. used for the empty Watchlist screen ("No Movies in watch list").
export default function EmptyState({ message = 'No data found', buttonText, onButtonClick }) {
  return (
    <div className="empty-state">
      <svg
        className="empty-state__icon"
        width="110"
        height="110"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 21s-7.5-4.6-10-9.2C.5 8 2 4.5 5.4 4 7.6 3.7 9.7 4.8 12 7.2"
          stroke="#d6d6d6"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 21s7.5-4.6 10-9.2c1.5-3.8 0-7.3-3.4-7.8-2.2-.3-4.3.8-6.6 3.2"
          stroke="#d6d6d6"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="3" y1="21" x2="21" y2="3" stroke="#d6d6d6" strokeWidth="1.6" strokeLinecap="round" />
      </svg>

      <p className="empty-state__message">{message}</p>

      {buttonText && (
        <button type="button" className="empty-state__button" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  )
}
