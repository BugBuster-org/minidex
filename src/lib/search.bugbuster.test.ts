import { describe, expect, it } from "vitest";
import { filterByName } from "./search";

const items = [
  { name: "bulbasaur" },
  { name: "charizard" },
  { name: "pikachu" },
];

describe("filterByName case-insensitivity", () => {
  it("finds pikachu when the query is uppercase", () => {
    expect(filterByName(items, "PIKA")).toEqual([{ name: "pikachu" }]);
  });
  it("finds pikachu when the query is mixed case", () => {
    expect(filterByName(items, "PiKa")).toEqual([{ name: "pikachu" }]);
  });
  it("still finds pikachu with a lowercase query", () => {
    expect(filterByName(items, "pika")).toEqual([{ name: "pikachu" }]);
  });
});
