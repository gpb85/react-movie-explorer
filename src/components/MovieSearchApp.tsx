import { useState } from "react";
import { useMovies } from "../hooks/useMovies";

import MovieList from "./MovieList";
import Favorites from "./Favorites";

export default function MovieSearchApp() {
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies("");
  return (
    <div>
      {isLoading && <p>Please wait..</p>}
      {error && <p>something went wrong</p>}
      <MovieList />
      <Favorites />
    </div>
  );
}
