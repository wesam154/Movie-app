import { useState,useEffect } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const[searchText,setSearchText]=useState(searchParams.get("query")||"");

  useEffect(()=>{
    setSearchText(searchParams.get("query")||"");
  },[searchParams]);

  function handleSubmit(event) {
    event.preventDefault();
    if (searchText.trim() === "") return;
    navigate(`/search?query=${encodeURIComponent(searchText)}`);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="search for a movie"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;