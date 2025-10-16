import { useState } from "react";
import SearchBar from "./SearchBar";
import { useMovies, type MovieProps } from "../hooks/useMovies";
import MovieDetailsCard from "./MovieDetailsCard";
import MovieCarousel from "./MovieCarousel";

export default function MovieList() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);
  const { sortedMovies, isLoading, error } = useMovies(query);

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <SearchBar query={query} onQueryChange={setQuery} />

      {isLoading && <p className="text-white mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {sortedMovies.length > 0 && (
        <MovieCarousel
          movies={sortedMovies}
          onSelect={(m) => setSelectedMovie(m)}
        />
      )}

      {selectedMovie && (
        <MovieDetailsCard
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
