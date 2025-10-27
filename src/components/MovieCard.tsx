import { type MovieProps } from "../types/movies";
import { useFavoritesContex } from "../context/FavoritesContext";

interface MovieCardProps {
  movie: MovieProps;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesContex();

  const isFavorite = favorites.map((m) => m.imdbID === movie.imdbID);

  return (
    <div>
      <img src={movie.Poster} alt={movie.Title} />
      {movie.Title}
      {movie.Year}
      {isFavorite ? (
        <button onClick={() => removeFavorite(movie.imdbID)}>
          Remove from favorites
        </button>
      ) : (
        <button onClick={() => addFavorite(movie)}>Add to favorites</button>
      )}
    </div>
  );
}
