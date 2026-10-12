import { describe, expect, it } from "vitest";
import { collectTypes, filterByType } from "./types";

const slot = (name: string, n: number) => ({ slot: n, type: { name } });
const bulbasaur = {
  name: "bulbasaur",
  types: [slot("grass", 1), slot("poison", 2)],
};
const charizard = {
  name: "charizard",
  types: [slot("fire", 1), slot("flying", 2)],
};
const pikachu = { name: "pikachu", types: [slot("electric", 1)] };
const all = [bulbasaur, charizard, pikachu];

describe("filterByType", () => {
  it("matches a single-type pokemon", () => {
    expect(filterByType(all, "electric")).toEqual([pikachu]);
  });
  it("matches the primary type of a dual-type pokemon", () => {
    expect(filterByType(all, "fire")).toEqual([charizard]);
  });
  it("returns all when the type is empty", () => {
    expect(filterByType(all, "")).toEqual(all);
  });
  it("returns nothing for an unknown type", () => {
    expect(filterByType(all, "dragon")).toEqual([]);
  });
  it("handles empty input and pokemon without types", () => {
    expect(filterByType([], "fire")).toEqual([]);
    expect(filterByType([{ types: [] }], "fire")).toEqual([]);
  });
});

describe("collectTypes", () => {
  it("returns unique type names", () => {
    const names = collectTypes([...all, bulbasaur]);
    expect(new Set(names).size).toBe(names.length);
    expect([...names].sort()).toEqual(["electric", "fire", "flying", "grass", "poison"]);
  });
  it("handles empty input", () => {
    expect(collectTypes([])).toEqual([]);
  });
});
