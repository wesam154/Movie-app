import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading.jsx';
import DetailsHeader from '../components/movie-details/DetailsHeader.jsx';
import ReviewsList from '../components/movie-details/ReviewsList.jsx';
import MediaGrid from '../components/MediaGrid.jsx';
import { getMovieDetails, getMovieReviews, getMovieRecommendations } from '../services/movieApi.js';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getMovieDetails(id),
      getMovieReviews(id),
      getMovieRecommendations(id)
    ])
      .then(([movieData, reviewsData, recommendationsData]) => {
        setMovie(movieData);
        setReviews(reviewsData);
        setRecommendations(recommendationsData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading label="Loading details..." />;
  if (!movie || movie.success === false) return <div className="page-container"><h2>Movie not found</h2></div>;

  return (
    <div className="page-container">
      <DetailsHeader movie={movie} />
      
      <ReviewsList reviews={reviews} />

      {recommendations.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2>Recommendations</h2>
          <MediaGrid 
            items={recommendations.map((m) => ({
              id: m.id,
              type: 'movie',
              image: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null,
              title: m.title,
              date: m.release_date,
              rating: Math.round(m.vote_average * 10)
            }))}
          />
        </div>
      )}
    </div>
  );
}