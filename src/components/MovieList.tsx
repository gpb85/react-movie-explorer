import { useState } from "react";
import { type MovieProps } from "../types/movies";
import SearchBar from "./SearchBar";
import { useMovies } from "../hooks/useMovies";

import Carousel from "./Carousel";

interface MovieListProps {
  movies?: MovieProps[];
}

export default function MovieList({ movies }: MovieListProps) {
  const [query, setQuery] = useState("");
  const { movies: fetchedMovies, isLoading, error } = useMovies(query);

  // Τα visible movies για αυτή τη “σελίδα”

  return (
    <div className="">
      <div className="">
        {/* 80% width */}
        <SearchBar query={query} onQueryChange={setQuery} />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      <Carousel movies={fetchedMovies} />
    </div>
  );
}
