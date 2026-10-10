import { useState } from "react";
import type { Favorite } from "./api/types";
import { Favorites } from "./components/Favorites";
import { PokemonDetail } from "./components/PokemonDetail";
import { PokemonList } from "./components/PokemonList";
import { removeFavorite, toggleFavorite } from "./lib/favorites";

export function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-6">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">minidex</h1>
      <main className="grid gap-6 md:grid-cols-[1fr_16rem]">
        {selected ? (
          <PokemonDetail
            name={selected}
            isFavorite={favorites.some((f) => f.name === selected)}
            onToggleFavorite={(fav) =>
              setFavorites((favs) => toggleFavorite(favs, fav))
            }
            onBack={() => setSelected(null)}
          />
        ) : (
          <PokemonList onSelect={setSelected} />
        )}
        <Favorites
          favorites={favorites}
          onSelect={setSelected}
          onRemove={(id) => setFavorites((favs) => removeFavorite(favs, id))}
        />
      </main>
    </div>
  );
}
