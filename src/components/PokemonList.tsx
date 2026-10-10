import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchPokemon, fetchPokemonPage } from "../api/pokeapi";
import type { PokemonSummary } from "../api/types";
import { formatId, idFromUrl } from "../lib/format";
import {
  PAGE_SIZE,
  hasNextPage,
  hasPrevPage,
  offsetForPage,
  totalPages,
} from "../lib/pagination";
import { filterByName } from "../lib/search";
import { spriteUrl } from "../lib/sprites";
import { collectTypes, filterByType } from "../lib/types";
import { typeColor } from "../lib/typeColors";

interface Props {
  onSelect: (name: string) => void;
}

interface PageState {
  page: number;
  count: number;
  items: PokemonSummary[];
}

export function PokemonList({ onSelect }: Props) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [data, setData] = useState<PageState | null>(null);
  const [error, setError] = useState<{ page: number; message: string } | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const list = await fetchPokemonPage(offsetForPage(page), PAGE_SIZE);
      const items = await Promise.all(
        list.results.map(async (r): Promise<PokemonSummary | null> => {
          const id = idFromUrl(r.url);
          if (id === null) return null;
          try {
            const d = await fetchPokemon(id);
            return { id: d.id, name: d.name, types: d.types };
          } catch {
            // Types unknown: still list it, it just won't match a type filter.
            return { id, name: r.name, types: [] };
          }
        }),
      );
      if (!cancelled) {
        setData({
          page,
          count: list.count,
          items: items.filter((i): i is PokemonSummary => i !== null),
        });
      }
    })().catch((e: unknown) => {
      if (!cancelled) {
        setError({
          page,
          message: e instanceof Error ? e.message : String(e),
        });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [page]);

  if (error?.page === page) {
    return (
      <p role="alert" className="text-destructive">
        Could not load pokemon: {error.message}
      </p>
    );
  }
  if (data?.page !== page)
    return (
      <ul
        aria-label="Loading"
        className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-3"
      >
        {Array.from({ length: PAGE_SIZE }, (_, i) => (
          <li key={i} className="h-36 animate-pulse rounded-xl bg-muted" />
        ))}
      </ul>
    );

  const visible = filterByType(filterByName(data.items, query), type);
  const pages = totalPages(data.count);

  return (
    <section>
      <h2 className="mb-3 text-2xl font-bold tracking-tight">Pokémon</h2>
      <div className="mb-5 flex flex-wrap gap-2">
        <div className="relative w-full max-w-xs">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            className="bg-card pl-8"
            type="search"
            aria-label="Search by name"
            placeholder="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          className="h-8 rounded-lg bg-card border border-input px-2.5 text-sm capitalize outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="Filter by type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All types</option>
          {collectTypes(data.items).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      {visible.length === 0 ? (
        <p className="text-muted-foreground">No pokémon match.</p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-3">
          {visible.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className="group flex w-full flex-col items-center gap-1 rounded-xl border bg-card p-3 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                onClick={() => onSelect(p.name)}
              >
                <img
                  src={spriteUrl(p.id)}
                  alt=""
                  loading="lazy"
                  className="size-20 transition group-hover:scale-110 [image-rendering:pixelated]"
                />
                <span className="text-sm font-semibold capitalize">
                  {formatId(p.id)} {p.name}
                </span>
                <span
                  className="flex flex-wrap justify-center gap-1"
                  aria-hidden
                >
                  {p.types.map((t) => (
                    <span
                      key={t.type.name}
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${typeColor(t.type.name)}`}
                    >
                      {t.type.name}
                    </span>
                  ))}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <nav className="mt-4 flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={!hasPrevPage(page)}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft aria-hidden />
          Previous
        </Button>
        <Badge variant="secondary">
          Page {page} of {pages}
        </Badge>
        <Button
          type="button"
          variant="outline"
          disabled={!hasNextPage(page, data.count)}
          onClick={() => setPage(page + 1)}
        >
          Next
          <ChevronRight aria-hidden />
        </Button>
      </nav>
    </section>
  );
}
