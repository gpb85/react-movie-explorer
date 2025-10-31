import { useState, useEffect } from "react";
import { type MovieProps } from "../types/movies";
import MovieCard from "./MovieCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CarouselProps {
  movies: MovieProps[];
}

export default function Carousel({ movies }: CarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(6);

  // Update moviesPerPage based on window width
  useEffect(() => {
    const updateMoviesPerPage = () => {
      if (window.innerWidth < 640) setMoviesPerPage(2); // mobile
      else if (window.innerWidth < 1024) setMoviesPerPage(4); // tablet
      else setMoviesPerPage(6); // desktop
    };

    updateMoviesPerPage();
    window.addEventListener("resize", updateMoviesPerPage);
    return () => window.removeEventListener("resize", updateMoviesPerPage);
  }, []);

  const prev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const next = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, Math.max(movies.length - moviesPerPage, 0))
    );
  };

  const visibleMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5 relative">
        <div className="relative mt-4 overflow-hidden">
          {/* Left arrow */}
          {startIndex > 0 && (
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            >
              <ArrowLeft size={24} />
            </button>
          )}

          {/* Carousel track */}
          <div className="flex justify-center gap-4 transition-all duration-500">
            {visibleMovies.map((movie) => (
              <div
                key={movie.imdbID}
                className={`flex-none`}
                style={{ width: `${100 / moviesPerPage}%` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {/* Right arrow */}
          {startIndex + moviesPerPage < movies.length && (
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            >
              <ArrowRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
