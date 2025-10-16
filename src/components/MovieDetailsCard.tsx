import { type MovieProps } from "../hooks/useMovies";

interface MovieDetailsCardProps {
  movie: MovieProps;
  onClose: () => void;
}

export default function MovieDetailsCard({
  movie,
  onClose,
}: MovieDetailsCardProps) {
  return (
    <div className="col-span-full bg-gray-900 text-white rounded-lg shadow-2xl p-6 border border-gray-800 transition-all duration-300 mt-4">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className="w-full md:w-1/3 h-80 object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{movie.Title}</h2>
            <p className="text-gray-400 mb-1">
              <strong>Year:</strong> {movie.Year}
            </p>
            <p className="text-gray-400 mb-1">
              <strong>IMDB ID:</strong> {movie.imdbID}
            </p>
          </div>
          <button
            onClick={onClose}
            className="self-end mt-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-5 py-2 rounded transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
