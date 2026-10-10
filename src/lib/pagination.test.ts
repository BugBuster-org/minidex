import { describe, expect, it } from "vitest";
import {
  PAGE_SIZE,
  hasNextPage,
  hasPrevPage,
  offsetForPage,
  totalPages,
} from "./pagination";

describe("pagination", () => {
  it("uses 20 per page", () => {
    expect(PAGE_SIZE).toBe(20);
  });
  it("computes offsets", () => {
    expect(offsetForPage(1)).toBe(0);
    expect(offsetForPage(2)).toBe(20);
    expect(offsetForPage(5)).toBe(80);
  });
  it("computes total pages at boundaries", () => {
    expect(totalPages(0)).toBe(1);
    expect(totalPages(1)).toBe(1);
    expect(totalPages(20)).toBe(1);
    expect(totalPages(21)).toBe(2);
    expect(totalPages(40)).toBe(2);
    expect(totalPages(1351)).toBe(68);
  });
  it("knows when there is a previous page", () => {
    expect(hasPrevPage(1)).toBe(false);
    expect(hasPrevPage(2)).toBe(true);
  });
  it("knows when there is a next page", () => {
    expect(hasNextPage(1, 40)).toBe(true);
    expect(hasNextPage(2, 40)).toBe(false);
    expect(hasNextPage(1, 20)).toBe(false);
    expect(hasNextPage(1, 0)).toBe(false);
  });
});
