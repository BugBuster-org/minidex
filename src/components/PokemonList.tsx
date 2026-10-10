import { useEffect, useState } from "react";
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
import { collectTypes, filterByType } from "../lib/types";

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
    return <p role="alert">Could not load pokemon: {error.message}</p>;
  }
  if (data?.page !== page) return <p>Loading…</p>;

  const visible = filterByType(filterByName(data.items, query), type);
  const pages = totalPages(data.count);

  return (
    <section>
      <h2>Pokémon</h2>
      <div className="filters">
        <input
          type="search"
          aria-label="Search by name"
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
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
        <p>No pokémon match.</p>
      ) : (
        <ul className="pokemon-list">
          {visible.map((p) => (
            <li key={p.id}>
              <button type="button" onClick={() => onSelect(p.name)}>
                {formatId(p.id)} {p.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      <nav className="pagination">
        <button
          type="button"
          disabled={!hasPrevPage(page)}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {pages}
        </span>
        <button
          type="button"
          disabled={!hasNextPage(page, data.count)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </nav>
    </section>
  );
}
