import { type MovieProps } from "../types/movies";

interface MovieCardProps {
  movie: MovieProps;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div>
      <img src={movie.Poster} alt={movie.Title} />
      {movie.Title}
      {movie.Year}
    </div>
  );
}
