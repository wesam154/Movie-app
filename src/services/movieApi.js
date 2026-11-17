const API_KEY = 'ccfa84f8238e33bdd055ce6f35b04c60';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getNowPlaying(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`);
  const data = await res.json();
  return data;
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data;
}

export async function getMovieReviews(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data.results || [];
}

export async function getMovieRecommendations(movieId) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data.results || [];
}

export async function getPopularTV(page = 1) {
  const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
  const data = await res.json();
  return data;
}

export async function getTVDetails(id) {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data;
}

export async function searchMovies(query, page = 1) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`);
  const data = await res.json();
  return data;
}