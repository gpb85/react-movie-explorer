export interface MovieProps {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Awards: string;
  imdbRating: string;
  Director: string;
  Plot: string;
  Genre: string;
  Actors: string;
  Language: string;
  Writer: string;
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
