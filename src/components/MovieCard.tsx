import { type MovieProps } from "../types/movies";
import { useFavoritesContext } from "../context/FavoritesContext";
import { Heart } from "lucide-react";

interface MovieCardProps {
  movie: MovieProps;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesContext();

  // ✅ Έλεγχος αν η ταινία υπάρχει στα favorites
  const isFavorite = favorites.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 relative group">
      {/* Εικόνα */}
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
        alt={movie.Title}
        className="w-full h-64 object-cover"
      />

      {/* Πληροφορίες */}
      <div className="p-3 flex flex-col justify-between">
        <h3 className="text-white font-semibold text-sm truncate">
          {movie.Title}
        </h3>
        <p className="text-gray-400 text-xs">{movie.Year}</p>
      </div>

      {/* Κουμπί favorite */}
      <button
        onClick={() =>
          isFavorite ? removeFavorite(movie.imdbID) : addFavorite(movie)
        }
        className="absolute top-2 right-2 p-2 rounded-full bg-black/60 hover:bg-black/80 transition z-10"
      >
        <Heart
          size={20}
          className={`${
            isFavorite ? "text-red-500 fill-red-500" : "text-gray-300"
          } transition-colors duration-300`}
        />
      </button>

      {/* Overlay για hover effect */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs pointer-events-none">
        {isFavorite
          ? "Click to remove from favorites"
          : "Click to add to favorites"}
      </div>
    </div>
  );
}
