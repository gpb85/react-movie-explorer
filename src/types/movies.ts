export interface MovieProps {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

export interface ImdbIDApiResponse {
  Search?: MovieProps[];
  Response: "True" | "False";
  Error?: string;
  totalResults?: string;
}

export interface useMoviesResult {
  movies: MovieProps[];
  sortedMovies: MovieProps[];

  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
