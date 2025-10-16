import { useState } from "react";
import { useMovies, type MoviesProps } from "../hooks/useMovies.ts";
import SearchBar from "./SearchBar.tsx";

export default function MovieList() {
  const [query, setQuery] = useState("");

  const { movies, sortedMovies, isLoading, error } = useMovies(query);
  return (
    <div>
      <SearchBar query={query} onQueryChange={setQuery} />
      {isLoading && <p>isLoading</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
