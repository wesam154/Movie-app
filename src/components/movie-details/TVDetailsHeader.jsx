import React from 'react';
import GenrePills from './GenrePills.jsx';
import HeartButton from './HeartButton.jsx';
import '../MediaCard.css';
import './TVDetailsHeader.css';

function TVDetailsHeader({ show }) {
    const imageUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : "/no-image-placeholder.png";

  return (
    <div className="tv-details-header">
      <img src={imageUrl} alt={show.name} className="tv-details-header__poster" />

      <div className="tv-details-header__info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ margin: 0 }}>{show.name}</h1>
          <HeartButton
            item={{
              id: show.id,
              type: 'tv',
              title: show.name,
              image: imageUrl,
              date: show.first_air_date,
              rating: Math.round((show.vote_average || 0) * 10),
              overview: show.overview,
            }}
            style={{ fontSize: '26px' }}
          />
        </div>
        <p className="tv-details-header__overview">{show.overview}</p>
        <GenrePills genres={show.genres}/>
        
        {/* بدل "Duration" اللي بتظهر مع الأفلام، هنا بنحط عدد المواسم */}
        <p className="tv-details-header__seasons">
          Seasons: {show.number_of_seasons}
        </p>

        <p className="tv-details-header__date">
          First Air Date: {show.first_air_date}
        </p>
      </div>
    </div>
  );
}

export default TVDetailsHeader;