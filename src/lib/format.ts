/** formatId(1) → "#001". Ids of four or more digits are not truncated. */
export function formatId(id: number): string {
  return `#${String(id).padStart(2, "0")}`;
}

/** Extracts the pokemon id from a PokeAPI resource url, or null if absent. */
export function idFromUrl(url: string): number | null {
  const match = /\/(\d+)\/?$/.exec(url);
  return match ? Number(match[1]) : null;
}
