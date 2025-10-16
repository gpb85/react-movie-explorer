import { type MovieProps } from "../hooks/useMovies";
import MovieCard from "./MovieCard";

interface MovieCarouselProps {
  movies: MovieProps[];
  onSelect: (movie: MovieProps) => void;
}

export default function MovieCarousel({
  movies,
  onSelect,
}: MovieCarouselProps) {
  if (!Array.isArray(movies)) return null;

  return (
    <div className="relative group mb-6">
      <h2 className="text-white text-2xl font-bold mb-4 ml-2">Trending</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-2">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="flex-shrink-0 w-48 md:w-56 lg:w-64"
          >
            <MovieCard movie={movie} onDetails={onSelect} />
          </div>
        ))}
      </div>
    </div>
  );
}
