import { type MovieProps } from "../hooks/useMovies";

interface MovieCardProps {
  movie: MovieProps;
  onDetails: (movie: MovieProps) => void;
}

export default function MovieCard({ movie, onDetails }: MovieCardProps) {
  return (
    <div className="relative group w-full h-72 rounded-lg overflow-hidden shadow-xl cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex flex-col justify-end p-4">
        <div className="bg-black/70 backdrop-blur-sm rounded-md p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white text-lg font-bold">{movie.Title}</h3>
          <p className="text-gray-300 text-sm">{movie.Year}</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onDetails(movie)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-1 rounded transition"
            >
              Details
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold text-sm px-4 py-1 rounded transition">
              Favourites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
