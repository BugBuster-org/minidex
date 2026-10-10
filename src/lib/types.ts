import type { PokemonTypeSlot } from "../api/types";

interface HasTypes {
  types: PokemonTypeSlot[];
}

/** Keeps pokemon having the given type in ANY of their slots. Empty = all. */
export function filterByType<T extends HasTypes>(
  items: T[],
  type: string,
): T[] {
  if (type === "") return items;
  return items.filter((item) => item.types.some((t) => t.type.name === type));
}

/** Sorted, de-duplicated type names present across the given pokemon. */
export function collectTypes(items: HasTypes[]): string[] {
  const names = new Set<string>();
  for (const item of items) {
    for (const t of item.types) names.add(t.type.name);
  }
  return [...names].sort();
}
