import React from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import WatchlistRow from '../components/watchlist/WatchlistRow.jsx'
import './Watchlist.css'
import { useWatchlist } from '../context/WatchlistContext.jsx'

export default function Watchlist() {
  const { watchlist } = useWatchlist()
  const navigate = useNavigate()

  return (
    <div className="page-container watchlist-page">
      <h1>Watchlist</h1>
      <p className="page-note">
        {watchlist.length} {watchlist.length === 1 ? 'item' : 'items'} saved
      </p>

      {watchlist.length === 0 ? (
        <EmptyState
          message="No items in watch list"
          buttonText="Back to home"
          onButtonClick={() => navigate('/')}
        />
      ) : (
        <div className="watchlist-page__list">
          {watchlist.map((item) => (
            <WatchlistRow key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
