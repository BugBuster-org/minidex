export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonTypeSlot {
  slot: number;
  type: { name: string };
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number; // decimeters
  weight: number; // hectograms
  types: PokemonTypeSlot[];
  stats: PokemonStat[];
  sprites: { front_default: string | null };
}

/** What the list needs to know about a pokemon: enough to search and filter. */
export type PokemonSummary = Pick<PokemonDetail, "id" | "name" | "types">;

export interface Favorite {
  id: number;
  name: string;
}
