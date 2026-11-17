import React from 'react';
import RatingStars from './RatingStars.jsx';
import GenrePills from './GenrePills.jsx';
import HeartButton from './HeartButton.jsx';
import '../MediaCard.css';

export default function DetailsHeader({ movie }) {
  const ratingPercent = Math.round(movie.vote_average * 10);
  const language =
    movie.spoken_languages?.[0]?.english_name ||
    (movie.original_language ? movie.original_language.toUpperCase() : '');
  const companyWithLogo = movie.production_companies?.find((c) => c.logo_path);

  return (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {movie.poster_path && (
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
          style={{ width: '300px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
        />
      )}
      <div style={{ flex: 1, minWidth: '280px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ margin: 0 }}>{movie.title}</h1>
          <HeartButton
            item={{
              id: movie.id,
              type: 'movie',
              title: movie.title,
              image: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null,
              date: movie.release_date,
              rating: ratingPercent,
              overview: movie.overview,
            }}
            style={{ fontSize: '26px' }}
          />
        </div>

        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '6px' }}>
          {movie.release_date}
          {movie.runtime ? ` • ${movie.runtime} mins` : ''}
          {language ? ` • ${language}` : ''}
        </p>

        <GenrePills genres={movie.genres} />
        <RatingStars rating={ratingPercent} />

        {movie.homepage && (
          <div style={{ marginTop: '12px' }}>
            <a 
              href={movie.homepage} 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#0070f3', textDecoration: 'underline', fontSize: '14px', fontWeight: '500' }}
            >
              Website
            </a>
          </div>
        )}

        <h3 style={{ marginTop: '16px', marginBottom: '8px' }}>Overview</h3>
        <p style={{ lineHeight: '1.6', color: 'var(--color-text-primary)' }}>
          {movie.overview}
        </p>

        {companyWithLogo && (
          <div style={{ marginTop: '20px' }}>
            <img 
              src={`https://image.tmdb.org/t/p/w500${companyWithLogo.logo_path}`} 
              alt={companyWithLogo.name} 
              style={{ maxHeight: '40px', maxWidth: '160px', objectFit: 'contain' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}