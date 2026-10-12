import { describe, expect, it } from "vitest";
import { filterByName } from "./search";

const items = [
  { name: "bulbasaur" },
  { name: "charizard" },
  { name: "pikachu" },
];

describe("filterByName", () => {
  it("matches substrings", () => {
    expect(filterByName(items, "char")).toEqual([{ name: "charizard" }]);
    expect(filterByName(items, "a")).toHaveLength(3);
  });
  it("ignores surrounding whitespace", () => {
    expect(filterByName(items, "  pika ")).toEqual([{ name: "pikachu" }]);
  });
  it("returns all items for an empty or blank query", () => {
    expect(filterByName(items, "")).toEqual(items);
    expect(filterByName(items, "   ")).toEqual(items);
  });
  it("returns nothing when no name matches", () => {
    expect(filterByName(items, "mew")).toEqual([]);
  });
  it("handles empty input", () => {
    expect(filterByName([], "pika")).toEqual([]);
  });
});
