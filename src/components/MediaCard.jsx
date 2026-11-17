import React from 'react'
import { Link } from 'react-router-dom'
import './MediaCard.css'
import HeartButton from './movie-details/HeartButton.jsx'

function getRatingColor(rating) {
  if (rating >= 70) return 'var(--color-rating-good)'
  if (rating >= 40) return 'var(--color-rating-ok)'
  return 'var(--color-rating-bad)'
}

/**
 * Reusable media card. The shared HeartButton owns watchlist state.
 */
export default function MediaCard({
  id,
  type = 'movie',
  image,
  title,
  date,
  rating,
  overview,
}) {
  const detailPath = type === 'tv' ? `/tv/${id}` : `/movies/${id}`

  return (
    <Link to={detailPath} className="media-card">
      <div className="media-card__poster-wrap">
        <img className="media-card__poster" src={image} alt={title} loading="lazy" />
        {typeof rating === 'number' && (
          <div
            className="media-card__rating"
            style={{ '--rating-color': getRatingColor(rating) }}
          >
            {rating}%
          </div>
        )}
      </div>

      <div className="media-card__info">
        <div className="media-card__text">
          <h3 className="media-card__title">{title}</h3>
          <span className="media-card__date">{date}</span>
        </div>

        <HeartButton
          item={{
            id,
            type,
            title,
            image,
            date,
            rating,
            overview,
          }}
        />
      </div>
    </Link>
  )
}
