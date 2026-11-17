import React from 'react'
import { useWatchlist } from '../../context/WatchlistContext.jsx'

export default function HeartButton({ item, className = '', style }) {
  const { toggleItem, isInWatchlist } = useWatchlist()
  const isActive = isInWatchlist(item?.id, item?.type)

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggleItem(item)
  }

  return (
    <button
      type="button"
      className={`media-card__favorite ${isActive ? 'is-active' : ''} ${className}`.trim()}
      onClick={handleClick}
      aria-label={isActive ? 'Remove from watchlist' : 'Add to watchlist'}
      aria-pressed={isActive}
      style={style}
    >
      {isActive ? '♥' : '♡'}
    </button>
  )
}
