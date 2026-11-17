import React from 'react'
import MediaCard from './MediaCard.jsx'
import './MediaGrid.css'

// Takes a list of media items and renders a MediaCard for each one, laid
// out in a responsive grid (6 columns on large screens, per the design).
// No other logic lives here.
export default function MediaGrid({ items = [], onToggleFavorite }) {
  if (!items.length) return null

  return (
    <div className="media-grid">
      {items.map((item) => (
        <MediaCard
          key={`${item.type || 'movie'}-${item.id}`}
          {...item}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
