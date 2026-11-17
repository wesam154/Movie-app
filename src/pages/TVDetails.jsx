import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTVDetails } from "../services/movieApi";
import TVDetailsHeader from "../components/movie-details/TVDetailsHeader";
import Loading from "../components/Loading";
import EmptyState from"../components/EmptyState";

function TVDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const[error,setError]=useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getTVDetails(id).then((data) => {
      if(data.success===false){
        setError("series is not available");
        setIsLoading(false);
        return;
      }
      setShow(data);
      setIsLoading(false);
    })
    .catch((err)=>{
      setError("Error while loading series data");
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) return <Loading />;
  if(error)return<EmptyState message={error}/>;
  if (!show) return null;

  return (
    <div className="page-container">
      <TVDetailsHeader show={show} />
    </div>
  );
}

export default TVDetails;