import React from 'react'
import { Link } from 'react-router-dom'
import HeartButton from '../movie-details/HeartButton.jsx'
import RatingStars from '../movie-details/RatingStars.jsx'
import MediaTypeBadge from './MediaTypeBadge.jsx'
import './WatchlistRow.css'

export default function WatchlistRow({ item }) {
  const detailPath = item.type === 'tv' ? `/tv/${item.id}` : `/movies/${item.id}`
  const image = item.image || '/no-image-placeholder.png'

  return (
    <article className="watchlist-row">
      <Link to={detailPath} className="watchlist-row__poster-link">
        <img className="watchlist-row__poster" src={image} alt={item.title} loading="lazy" />
      </Link>

      <div className="watchlist-row__content">
        <div className="watchlist-row__top">
          <div>
            <div className="watchlist-row__title-line">
              <h2 className="watchlist-row__title">{item.title}</h2>
              <MediaTypeBadge type={item.type} />
            </div>
            <p className="watchlist-row__date">{item.date || 'Release date unavailable'}</p>
          </div>

          <HeartButton item={item} />
        </div>

        <RatingStars rating={item.rating || 0} />

        <p className="watchlist-row__overview">
          {item.overview || 'No overview available for this title.'}
        </p>
      </div>
    </article>
  )
}
