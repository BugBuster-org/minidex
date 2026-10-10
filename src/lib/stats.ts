/** Sum of all base stats. */
export function totalBaseStats(stats: { base_stat: number }[]): number {
  return stats.reduce((sum, s) => sum + s.base_stat, 0);
}
