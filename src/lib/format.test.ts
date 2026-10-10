import { describe, expect, it } from "vitest";
import { formatId, idFromUrl } from "./format";

describe("formatId", () => {
  it("pads to three digits", () => {
    expect(formatId(1)).toBe("#001");
    expect(formatId(25)).toBe("#025");
    expect(formatId(150)).toBe("#150");
  });
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
