import { type MovieProps } from "../types/movies";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: MovieProps[];
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.imdbID}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
