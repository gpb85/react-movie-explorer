import type { MovieProps } from "../types/movies";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

/** -----------------------------
 * TYPES
 * ----------------------------- */

interface FavoritesState {
  favorites: MovieProps[];
}

type FavoriteActions =
  | { type: "ADD_FAVORITE"; payload: MovieProps }
  | { type: "REMOVE_FAVORITE"; payload: string }
  | { type: "LOAD_FAVORITES"; payload: MovieProps[] };

interface FavoritesContextProps {
  favorites: MovieProps[];
  addFavorite: (movie: MovieProps) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

/** -----------------------------
 * REDUCER
 * ----------------------------- */

function favoritesReducer(
  state: FavoritesState,
  action: FavoriteActions
): FavoritesState {
  const { type, payload } = action;

  switch (type) {
    case "ADD_FAVORITE":
      if (
        state.favorites.find((m) => m.imdbID === (payload as MovieProps).imdbID)
      )
        return state;
      return { favorites: [...state.favorites, payload as MovieProps] };

    case "REMOVE_FAVORITE":
      return {
        favorites: state.favorites.filter(
          (m) => m.imdbID !== (payload as string)
        ),
      };

    case "LOAD_FAVORITES":
      return { favorites: payload as MovieProps[] };

    default:
      return state;
  }
}

/** -----------------------------
 * CONTEXT
 * ----------------------------- */

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

/** -----------------------------
 * PROVIDER
 * ----------------------------- */

const FavoritesContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { favorites: [] });

  /** Load once from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: "LOAD_FAVORITES", payload: parsed });
        }
      } catch {
        console.error("Corrupted favorites data, resetting...");
        localStorage.removeItem("favorites");
      }
    }
  }, []);

  /** Persist on change */
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  /** Stable action creators */
  const addFavorite = useCallback((movie: MovieProps) => {
    dispatch({ type: "ADD_FAVORITE", payload: movie });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id });
  }, []);

  const isFavorite = useCallback(
    (id: string) => state.favorites.some((m) => m.imdbID === id),
    [state.favorites]
  );

  /** Memoized context value */
  const value = useMemo(
    () => ({
      favorites: state.favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
    }),
    [state.favorites, addFavorite, removeFavorite, isFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

/** -----------------------------
 * CUSTOM HOOK
 * ----------------------------- */

const useFavoritesContext = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesContextProvider"
    );
  }
  return context;
};

/** -----------------------------
 * EXPORTS
 * ----------------------------- */

export { FavoritesContextProvider, useFavoritesContext };
