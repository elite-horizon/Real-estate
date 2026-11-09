import { useCallback, useEffect, useState } from "react";
import { getBrowserStorage } from "@/lib/storage";

const FAVORITES_KEY = "favorites";
const FAVORITES_EVENT = "aurelis:favorites-changed";

function readFavorites() {
  return getBrowserStorage().get<string[]>(FAVORITES_KEY, []);
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(readFavorites);

  useEffect(() => {
    const sync = () => setFavorites(readFavorites());
    window.addEventListener(FAVORITES_EVENT, sync);
    return () => window.removeEventListener(FAVORITES_EVENT, sync);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    const current = readFavorites();
    const next = current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id];
    getBrowserStorage().set(FAVORITES_KEY, next);
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  }, []);

  return { favorites, toggleFavorite, isFavorite: (id: string) => favorites.includes(id) };
}
