import { useEffect, useState } from "react";
import { fetchPokemon } from "../api/pokeapi";
import type { Favorite, PokemonDetail as Detail } from "../api/types";
import { formatId } from "../lib/format";
import { totalBaseStats } from "../lib/stats";
import { decimetersToMeters, hectogramsToKg } from "../lib/units";

interface Props {
  name: string;
  isFavorite: boolean;
  onToggleFavorite: (fav: Favorite) => void;
  onBack: () => void;
}

export function PokemonDetail({
  name,
  isFavorite,
  onToggleFavorite,
  onBack,
}: Props) {
  // Results are tagged with the name they were fetched for, so a stale
  // result is never shown while a new request is in flight.
  const [result, setResult] = useState<{
    name: string;
    pokemon?: Detail;
    error?: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPokemon(name)
      .then((pokemon) => {
        if (!cancelled) setResult({ name, pokemon });
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setResult({
            name,
            error: e instanceof Error ? e.message : String(e),
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [name]);

  const current = result?.name === name ? result : null;
  const pokemon = current?.pokemon;
  const error = current?.error;

  return (
    <section>
      <button type="button" onClick={onBack}>
        Back
      </button>
      {error && (
        <p role="alert">
          Could not load {name}: {error}
        </p>
      )}
      {!error && !pokemon && <p>Loading…</p>}
      {pokemon && (
        <article>
          <h2>
            {formatId(pokemon.id)} {pokemon.name}
          </h2>
          {pokemon.sprites.front_default && (
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          )}
          <p>Types: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
          <p>Height: {decimetersToMeters(pokemon.height)} m</p>
          <p>Weight: {hectogramsToKg(pokemon.weight)} kg</p>
          <table>
            <tbody>
              {pokemon.stats.map((s) => (
                <tr key={s.stat.name}>
                  <th scope="row">{s.stat.name}</th>
                  <td>{s.base_stat}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">total</th>
                <td>{totalBaseStats(pokemon.stats)}</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            onClick={() =>
              onToggleFavorite({ id: pokemon.id, name: pokemon.name })
            }
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
        </article>
      )}
    </section>
  );
}
