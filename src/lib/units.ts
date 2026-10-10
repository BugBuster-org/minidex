/** PokeAPI heights are in decimeters. */
export function decimetersToMeters(dm: number): number {
  return dm / 10;
}

/** PokeAPI weights are in hectograms. */
export function hectogramsToKg(hg: number): number {
  return hg / 100;
}
