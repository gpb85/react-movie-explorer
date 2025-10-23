import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useDebugValue,
} from "react";
import {
  type MovieProps,
  type ImdbIDApiResponse,
  type useMoviesResult,
} from "../types/movies.ts";

const baseUrl = "https://www.omdbapi.com";
const apikey = "6194636e";

export function useMovies(query: string): useMoviesResult {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const abortedControllerRef = useRef<AbortController | null>(null);

  const deferredQuery = useDeferredValue(query);

  const fetchMovies = useCallback(async () => {
    const searchQuery = deferredQuery.trim();

    if (!searchQuery) {
      setMovies([]);
      setError(null);
      return;
    }

    abortedControllerRef.current?.abort();
    abortedControllerRef.current = new AbortController();

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${baseUrl}/?apikey=${apikey}&s=${searchQuery}`,
        { signal: abortedControllerRef.current.signal }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status:${response.status}`);
      }
      const data: ImdbIDApiResponse = await response.json();
      if (data.Response === "True" && data.Search) {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found");
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message || "something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }, [deferredQuery]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const sortedMovies = useMemo(
    () => [...movies].sort((a, b) => a.Title.localeCompare(b.Title)),
    [movies]
  );

  useDebugValue(
    isLoading
      ? "Loading movies"
      : error
      ? `Error:${error}`
      : `Fetched ${movies.length} movies`
  );
  return { movies, sortedMovies, isLoading, error, refetch: fetchMovies };
}
