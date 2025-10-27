import { useState } from "react";
import { type MovieProps } from "../types/movies";
import SearchBar from "./SearchBar";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies?: MovieProps[]; // προαιρετικό αν θες να περάσεις props
}

export default function MovieList({ movies }: MovieListProps) {
  const [query, setQuery] = useState("");
  const { movies: fetchedMovies, isLoading, error } = useMovies(query);

  return (
    <div className="search-box">
      <SearchBar query={query} onQueryChange={setQuery} />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="movies-grid">
        {fetchedMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
