import { describe, expect, it } from "vitest";
import { formatId, idFromUrl } from "./format";

describe("formatId", () => {
  it("does not truncate larger ids", () => {
    expect(formatId(1025)).toBe("#1025");
  });
});

describe("idFromUrl", () => {
  it("reads the id from a resource url", () => {
    expect(idFromUrl("https://pokeapi.co/api/v2/pokemon/25/")).toBe(25);
    expect(idFromUrl("https://pokeapi.co/api/v2/pokemon/10001")).toBe(10001);
  });
  it("returns null when there is no id", () => {
    expect(idFromUrl("https://pokeapi.co/api/v2/pokemon/pikachu/")).toBeNull();
    expect(idFromUrl("")).toBeNull();
  });
});
