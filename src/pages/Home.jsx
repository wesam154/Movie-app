import React, { useEffect, useState } from 'react';
import MediaGrid from '../components/MediaGrid.jsx';
import Pagination from '../components/Pagination.jsx';
import Loading from '../components/Loading.jsx';
import { getNowPlaying } from '../services/movieApi.js';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getNowPlaying(currentPage)
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load now playing movies. Please try again later.');
        setLoading(false);
      });
  }, [currentPage]);

  if (loading && movies.length === 0) return <Loading label="Loading movies..." />;

  return (
    <div className="page-container">
      <h1>Now Playing Movies</h1>
      <p className="page-note">Explore now playing movies fetched from TMDB API.</p>

      {error && <div className="alert alert-danger" style={{ color: 'red', margin: '20px 0' }}>{error}</div>}

      <MediaGrid 
        items={movies.map((m) => ({
          id: m.id,
          type: 'movie',
          image: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null,
          title: m.title,
          date: m.release_date,
          rating: Math.round(m.vote_average * 10)
        }))}
      />

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}