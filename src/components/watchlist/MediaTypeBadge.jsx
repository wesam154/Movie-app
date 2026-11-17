import React from 'react'

export default function MediaTypeBadge({ type }) {
  const label = type === 'tv' ? 'TV Show' : 'Movie'

  return <span className="watchlist-type-badge">{label}</span>
}
