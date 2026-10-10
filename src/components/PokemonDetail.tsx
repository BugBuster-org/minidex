import { ArrowLeft, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchPokemon } from "../api/pokeapi";
import type { Favorite, PokemonDetail as Detail } from "../api/types";
import { formatId } from "../lib/format";
import { totalBaseStats } from "../lib/stats";
import { typeColor } from "../lib/typeColors";
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
        <ArrowLeft aria-hidden />
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
          <Card className="gap-4 overflow-hidden px-0 pt-0">
            <div className="flex flex-col items-center gap-2 bg-gradient-to-b from-primary/20 to-transparent px-4 pt-6">
              {pokemon.sprites.front_default && (
                <img
                  className="size-40 drop-shadow-lg [image-rendering:pixelated]"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
              )}
              <h2 className="text-2xl font-bold capitalize">
                {formatId(pokemon.id)} {pokemon.name}
              </h2>
              <div className="flex gap-2" aria-hidden>
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${typeColor(t.type.name)}`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
              <div className="grid grid-cols-1 gap-1 text-sm text-muted-foreground sm:grid-cols-3">
                <p>Types: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
                <p>Height: {decimetersToMeters(pokemon.height)} m</p>
                <p>Weight: {hectogramsToKg(pokemon.weight)} kg</p>
              </div>
              <table className="w-full border-collapse text-sm">
                <tbody>
                  {pokemon.stats.map((s) => (
                    <tr key={s.stat.name} className="border-b">
                      <th
                        scope="row"
                        className="py-1 pr-4 text-left font-medium whitespace-nowrap capitalize"
                      >
                        {s.stat.name}
                      </th>
                      <td className="w-10 py-1 text-right tabular-nums">
                        {s.base_stat}
                      </td>
                      <td className="w-full py-1 pl-3" aria-hidden>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: `${Math.min(100, (s.base_stat / 150) * 100)}%`,
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <th scope="row" className="py-1 pr-4 text-left">
                      total
                    </th>
                    <td className="py-1 text-right tabular-nums">
                      {totalBaseStats(pokemon.stats)}
                    </td>
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
                <Heart
                  aria-hidden
                  className={isFavorite ? "fill-current" : ""}
                />
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </Button>
            </div>
          </Card>
        </article>
      )}
    </section>
  );
}
