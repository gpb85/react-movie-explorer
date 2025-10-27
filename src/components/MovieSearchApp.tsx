import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";

export default function MovieSearchApp() {
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies(query);
  return (
    <div>
      <SearchBar query={query} onQueryChange={setQuery} />
      {isLoading && <p>Please wait..</p>}
      {error && <p>something went wrong</p>}s
      <MovieList />
    </div>
  );
}
