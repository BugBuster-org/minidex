import type { PokemonDetail, PokemonListResponse } from "./types";

export const API_BASE = "https://pokeapi.co/api/v2";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`PokeAPI request failed: ${res.status} ${url}`);
  }
  return (await res.json()) as T;
}

export function fetchPokemonPage(
  offset: number,
  limit: number,
): Promise<PokemonListResponse> {
  return getJson<PokemonListResponse>(
    `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`,
  );
}

export function fetchPokemon(
  nameOrId: string | number,
): Promise<PokemonDetail> {
  return getJson<PokemonDetail>(`${API_BASE}/pokemon/${nameOrId}`);
}
