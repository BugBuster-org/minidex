/** Case-insensitive substring match on name. Blank query returns everything. */
export function filterByName<T extends { name: string }>(
  items: T[],
  query: string,
): T[] {
  const q = query.trim().toLowerCase();
  if (q === "") return items;
  return items.filter((item) => item.name.toLowerCase().includes(q));
}
