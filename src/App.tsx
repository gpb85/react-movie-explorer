import "./App.css";

import MovieSearchApp from "./components/MovieSearchApp";
import { FavoritesContextProvider } from "./context/FavoritesContext";

export default function App() {
  return (
    <FavoritesContextProvider>
      <MovieSearchApp />
    </FavoritesContextProvider>
  );
}
