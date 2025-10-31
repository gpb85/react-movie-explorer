import { useFavoritesContext } from "../context/FavoritesContext";
import type { MovieProps } from "../types/movies";
import Carousel from "./Carousel";

interface FavoritesProps {
  movies: MovieProps;
}

export default function Favorites() {
  const { favorites } = useFavoritesContext();

  return <Carousel movies={favorites} moviesPerPage={5} />;
}
