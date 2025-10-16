import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

export interface MoviesProps {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Runtime: string;
  Genre: string;
  Writer: string;
  Language: string;
  Actors: string;
  Plot: string;
}

interface OmdbapiResponseProps {
  Search?: MoviesProps[];
  totalResults: string;
  Error?: string;
  Response: "True" | "False";
}

interface UseMoviesResultProps {
  movies: MoviesProps[];
  sortedMovies: MoviesProps[];
  isLoading: boolean;
  error: string | null;
}

const baseUrl = "https://www.omdbapi.com";
const apikey = "6194636e";

export function useMovies(query: string): UseMoviesResultProps {
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const abortedControllerRef = useRef<AbortController | null>(null);

  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    if (!deferredQuery.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    const fetchMovies = async () => {
      abortedControllerRef.current?.abort();
      abortedControllerRef.current = new AbortController();

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${baseUrl}?s=${deferredQuery}&apikey=${apikey}`,
          {
            signal: abortedControllerRef.current?.signal,
          }
        );
        const data: OmdbapiResponseProps = await response.json();
        if (data.Response === "True" && data.Search) {
          setMovies(data.Search);
          console.table(data);
        } else {
          setError(data.Error || "No movies found");
          setMovies([]);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
          setMovies([]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [deferredQuery]);

  const sortedMovies = useMemo(
    () =>
      Array.isArray(movies)
        ? [...movies].sort((a, b) => a.Title.localeCompare(b.Title))
        : [],
    [movies]
  );
  return { movies, sortedMovies, isLoading, error };
}

/* import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

export interface MovieProps {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Runtime?: string;
  Genre?: string;
  Writer?: string;
  Language?: string;
  Actors?: string;
  Plot?: string;
}

interface OmdbSearchResponseProps {
  Search?: { imdbID: string; Title: string; Year: string; Poster: string }[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

interface OmdbMovieDetailProps {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  Genre: string;
  Writer: string;
  Language: string;
  Actors: string;
  Plot: string;
}

interface UseMoviesResultProps {
  movies: MovieProps[];
  sortedMovies: MovieProps[];
  isLoading: boolean;
  error: string | null;
}

const BASE_URL = "https://www.omdbapi.com";
const API_KEY = "6194636e";

const movieDetailsCache: Record<string, MovieProps> = {};

export function useMovies(query: string): UseMoviesResultProps {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    if (!deferredQuery.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    const fetchMovies = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      setIsLoading(true);
      setError(null);

      try {
        const searchRes = await fetch(
          `${BASE_URL}?s=${deferredQuery}&apikey=${API_KEY}`,
          { signal: abortControllerRef.current.signal }
        );
        const searchData: OmdbSearchResponseProps = await searchRes.json();

        if (searchData.Response !== "True" || !searchData.Search) {
          setError(searchData.Error || "No movies found");
          setMovies([]);
          return;
        }

        const detailedMovies: MovieProps[] = await Promise.all(
          searchData.Search.map(async (movie) => {
            if (movieDetailsCache[movie.imdbID]) {
              return movieDetailsCache[movie.imdbID];
            }

            const detailRes = await fetch(
              `${BASE_URL}?i=${movie.imdbID}&apikey=${API_KEY}`,
              { signal: abortControllerRef.current.signal }
            );
            const detailData: OmdbMovieDetailProps = await detailRes.json();

            const fullMovie: MovieProps = {
              imdbID: detailData.imdbID,
              Title: detailData.Title,
              Year: detailData.Year,
              Poster: detailData.Poster,
              Runtime: detailData.Runtime,
              Genre: detailData.Genre,
              Writer: detailData.Writer,
              Language: detailData.Language,
              Actors: detailData.Actors,
              Plot: detailData.Plot,
            };

            movieDetailsCache[movie.imdbID] = fullMovie;
            return fullMovie;
          })
        );

        setMovies(detailedMovies);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
          setMovies([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [deferredQuery]);

  const sortedMovies = useMemo(
    () => [...movies].sort((a, b) => a.Title.localeCompare(b.Title)),
    [movies]
  );

  return { movies, sortedMovies, isLoading, error };
}
 */
