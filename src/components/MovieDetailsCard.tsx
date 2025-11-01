import { useEffect, useState } from "react";
import { type MovieProps } from "../types/movies";
import { X } from "lucide-react";

interface MovieDetailsCardProps {
  imdbID: string;
  onClose: () => void;
}

export default function MovieDetailsCard({
  imdbID,
  onClose,
}: MovieDetailsCardProps) {
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=6194636e&i=${imdbID}`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Failed to fetch movie details");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [imdbID]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gray-900 text-white p-6 rounded-xl">
          <p>{error}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-5xl relative shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Poster */}
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
            alt={movie.Title}
            className="w-full lg:w-[56%] object-cover rounded"
          />

          {/* Details */}
          <div className="w-full lg:w-[44%] flex flex-col">
            <h2 className="text-2xl font-bold">
              {movie.Title} ({movie.Year})
            </h2>
            <p className="mt-2 text-gray-300">{movie.Plot}</p>
            <p className="mt-2 text-sm text-gray-400">
              Director: {movie.Director}
            </p>
            <p className="mt-1 text-sm text-gray-400">Writer: {movie.Writer}</p>
            <p className="mt-1 text-sm text-gray-400">Actors: {movie.Actors}</p>
            <p className="mt-1 text-sm text-gray-400">Genre: {movie.Genre}</p>
            <p className="mt-1 text-sm text-gray-400">
              Language: {movie.Language}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              IMDB Rating: {movie.imdbRating}
            </p>
            <p className="mt-1 text-sm text-gray-400">Awards: {movie.Awards}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
