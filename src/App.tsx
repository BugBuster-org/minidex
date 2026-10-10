import { useState } from "react";
import type { Favorite } from "./api/types";
import { Favorites } from "./components/Favorites";
import { PokemonDetail } from "./components/PokemonDetail";
import { PokemonList } from "./components/PokemonList";
import { removeFavorite, toggleFavorite } from "./lib/favorites";
import "./App.css";

export function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  return (
    <div className="app">
      <h1>minidex</h1>
      <main>
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
