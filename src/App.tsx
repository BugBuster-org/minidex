import { useState } from "react";
import type { Favorite } from "./api/types";
import { Favorites } from "./components/Favorites";
import { KnownBugs } from "./components/KnownBugs";
import { PokemonDetail } from "./components/PokemonDetail";
import { PokemonList } from "./components/PokemonList";
import { removeFavorite, toggleFavorite } from "./lib/favorites";

export function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-br from-primary to-red-800 text-primary-foreground shadow-lg">
        <div className="mx-auto flex max-w-screen-2xl items-center gap-3 px-4 py-5 md:px-6">
          <span className="flex size-10 items-center justify-center rounded-full border-4 border-white bg-white/20">
            <span className="size-3 rounded-full bg-white" />
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">minidex</h1>
          <p className="ml-auto hidden text-sm text-primary-foreground/80 sm:block">
            Your pocket Pokédex
          </p>
        </div>
      </header>
      <main className="mx-auto grid max-w-screen-2xl gap-6 p-4 md:grid-cols-[1fr_20rem] md:p-6">
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
        <div className="flex flex-col gap-6">
          <Favorites
            favorites={favorites}
            onSelect={setSelected}
            onRemove={(id) => setFavorites((favs) => removeFavorite(favs, id))}
          />
          <KnownBugs />
        </div>
      </main>
    </div>
  );
}
