import type { Favorite } from "../api/types";

export function isFavorite(favorites: Favorite[], id: number): boolean {
  return favorites.some((f) => f.id === id);
}

/** Adds a favorite; adding an existing id is a no-op. Never mutates. */
export function addFavorite(favorites: Favorite[], fav: Favorite): Favorite[] {
  return isFavorite(favorites, fav.id) ? favorites : [...favorites, fav];
}

export function removeFavorite(favorites: Favorite[], id: number): Favorite[] {
  return favorites.filter((f) => f.id !== id);
}

export function toggleFavorite(
  favorites: Favorite[],
  fav: Favorite,
): Favorite[] {
  return isFavorite(favorites, fav.id)
    ? removeFavorite(favorites, fav.id)
    : addFavorite(favorites, fav);
}
