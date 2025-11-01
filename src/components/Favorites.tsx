import { useFavoritesContext } from "../context/FavoritesContext";

import Carousel from "./Carousel";

export default function Favorites() {
  const { favorites } = useFavoritesContext();

  return <Carousel movies={favorites} />;
}
