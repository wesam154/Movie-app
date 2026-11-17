import { useState, useEffect } from "react";
import { getPopularTV } from "../services/movieApi";
import MediaGrid from "../components/MediaGrid";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
function TVShows() {
  const [shows, setShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error,setError]=useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getPopularTV(currentPage).then((data) => {
      const formattedShows = data.results.map((show) => ({
        id: show.id,
        type: "tv",
        image: show.poster_path
          ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
          : "/no-image-placeholder.png",
        title:show.name,
        date: show.first_air_date,
        rating: Math.round(show.vote_average * 10),
        isFavorite: false,
      }));

      setShows(formattedShows);
      setTotalPages(data.total_pages);
      setIsLoading(false);
    })
    .catch((err)=>{
      setError("Error Loading series.Try again");
      setIsLoading(false);
    });
  }, [currentPage]);

  if(isLoading)return<Loading/>;
  if(error)return<EmptyState message={error}/>;

  return (
    <div className="page-container">
      <h1>Popular TV Shows</h1>

      {shows.length===0?(
        <EmptyState message="there are no series available" />
      ) : (
        <>
          <MediaGrid items={shows} />
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

export default TVShows;