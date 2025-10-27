import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { MovieProps } from "../types/movies";

interface FavoritesState {
  favorites: MovieProps[];
}

type FavoritesActions =
  | { type: "ADD_FAVORITE"; payload: MovieProps }
  | { type: "REMOVE_FAVORITE"; payload: string }
  | { type: "SET_FAVORITES"; payload: MovieProps[] };

const favoritesReducer = (
  state: FavoritesState,
  action: FavoritesActions
): FavoritesState => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_FAVORITE":
      if (
        state.favorites.find((m) => m.imdbID === (payload as MovieProps).imdbID)
      )
        return state;
      return {
        favorites: [...state.favorites, payload as MovieProps],
      };
    case "REMOVE_FAVORITE":
      return {
        favorites: state.favorites.filter(
          (m) => m.imdbID !== (payload as string)
        ),
      };

    case "SET_FAVORITES":
      return {
        favorites: payload as MovieProps[],
      };

    default:
      return state;
  }
};

interface FavoritesContextProps {
  favorites: MovieProps[];
  addFavorite: (movie: MovieProps) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

export function FavoritesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(favoritesReducer, { favorites: [] });

  //effect favorites from local only once
  useEffect(() => {
    try {
      const saved = localStorage.getItem("favorites");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "SET_FAVORITES", payload: parsed });
      }
    } catch (error) {
      console.warn("Something went wrong with local", error);
    }
  }, []);

  //save to local everytime something change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  //global state actions

  //add favorite

  const addFavorite = (movie: MovieProps) => {
    dispatch({ type: "ADD_FAVORITE", payload: movie as MovieProps });
  };

  const removeFavorite = (id: string) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id as string });
  };

  //memoized value(stable object)
  const value = useMemo(
    () => ({
      favorites: state.favorites,
      addFavorite,
      removeFavorite,
    }),
    [state.favorites]
  );
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContex() {
  const favoritesContext = useContext(FavoritesContext);
  if (favoritesContext === undefined) {
    throw new Error(
      "UseFavoritesContext must be used withing FavoritesContextProvider"
    );
  }
  return favoritesContext;
}
