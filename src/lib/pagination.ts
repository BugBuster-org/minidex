export const PAGE_SIZE = 20;

/** Pages are 1-based. */
export function offsetForPage(page: number, pageSize = PAGE_SIZE): number {
  return (page - 1) * pageSize;
}

export function totalPages(count: number, pageSize = PAGE_SIZE): number {
  return Math.max(1, Math.ceil(count / pageSize));
}

export function hasPrevPage(page: number): boolean {
  return page > 1;
}

export function hasNextPage(
  page: number,
  count: number,
  pageSize = PAGE_SIZE,
): boolean {
  return page <= totalPages(count, pageSize);
}
