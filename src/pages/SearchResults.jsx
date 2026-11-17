import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/movieApi";
import SearchBar from "../components/search/SearchBar";
import MediaGrid from "../components/MediaGrid";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import "./SearchResults.css";
function SearchResults() {
  // بنقرأ الكلمة اللي المستخدم كتبها من الرابط (?q=...)
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // لو مفيش كلمة بحث أصلاً، منبعتش طلب فاضي
    if (!query) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchMovies(query, currentPage).then((data) => {
      const formattedResults = data.results.map((movie) => ({
        id: movie.id,
        type: "movie", 
        image: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/no-image-placeholder.png",
        title: movie.title,
        date: movie.release_date,
        rating: Math.round(movie.vote_average * 10),
        isFavorite: false, // الشخص 4 هو اللي هيربطها بالمفضلة الحقيقية
      }));

      setResults(formattedResults);
      setTotalPages(data.total_pages);
      setIsLoading(false);
    });

    // كل مرة الكلمة أو رقم الصفحة يتغير، الطلب يتكرر
  }, [query, currentPage]);

  return (
    <div className="search-results-page">
      <SearchBar />

      <h2>Search Results for : {query}</h2>

      {isLoading ? (
        <Loading />
      ) : results.length === 0 ? (
        <EmptyState message="there are no matching results" />
      ) : (
        <>
          <MediaGrid items={results} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default SearchResults;