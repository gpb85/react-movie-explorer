import {
  useDebugValue,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface MovieProps {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface OmdbSearchResponseProps {
  Search?: MovieProps[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

interface UseMoviesResultProps {
  movies: MovieProps[];
  sortedMovies: MovieProps[];
  isLoading: boolean;
  error: string | null;
}

const API_KEY = "6194636e";
const BASE_URL = "https://www.omdbapi.com/";

export function useMovies(query: string): UseMoviesResultProps {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    if (!deferredQuery) {
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
        const response = await fetch(
          `${BASE_URL}?s=${deferredQuery}&apikey=${API_KEY}`,
          { signal: abortControllerRef.current.signal }
        );
        const data: OmdbSearchResponseProps = await response.json();
        console.table(data);

        if (data.Response === "True" && data.Search) {
          setMovies(data.Search);
        } else {
          setError(data.Error || "No movies found");
          setMovies([]);
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          setError(error.message || "Something went wrong");
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

  useDebugValue(movies.length ? `${movies.length} movies` : "no movies");

  return { movies, sortedMovies, error, isLoading };
}
