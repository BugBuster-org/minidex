import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      <Button type="button" variant="outline" className="mb-4" onClick={onBack}>
        Back
      </Button>
      {error && (
        <p role="alert" className="text-destructive">
          Could not load {name}: {error}
        </p>
      )}
      {!error && !pokemon && <p className="text-muted-foreground">Loading…</p>}
      {pokemon && (
        <article>
          <Card className="gap-3 px-4">
            <h2 className="text-xl font-semibold capitalize">
              {formatId(pokemon.id)} {pokemon.name}
            </h2>
            {pokemon.sprites.front_default && (
              <img
                className="size-32 [image-rendering:pixelated]"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
            )}
            <p>Types: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
            <p>Height: {decimetersToMeters(pokemon.height)} m</p>
            <p>Weight: {hectogramsToKg(pokemon.weight)} kg</p>
            <table className="w-full max-w-xs border-collapse text-sm">
              <tbody>
                {pokemon.stats.map((s) => (
                  <tr key={s.stat.name} className="border-b">
                    <th
                      scope="row"
                      className="py-1 pr-4 text-left font-medium capitalize"
                    >
                      {s.stat.name}
                    </th>
                    <td className="py-1">{s.base_stat}</td>
                  </tr>
                ))}
                <tr className="font-semibold">
                  <th scope="row" className="py-1 pr-4 text-left">
                    total
                  </th>
                  <td className="py-1">{totalBaseStats(pokemon.stats)}</td>
                </tr>
              </tbody>
            </table>
            <Button
              type="button"
              variant={isFavorite ? "secondary" : "default"}
              className="self-start"
              onClick={() =>
                onToggleFavorite({ id: pokemon.id, name: pokemon.name })
              }
            >
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </Button>
          </Card>
        </article>
      )}
    </section>
  );
}
