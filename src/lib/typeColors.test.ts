import { describe, expect, it } from "vitest";
import { typeColor } from "./typeColors";

describe("typeColor", () => {
  it("returns classes for a known type", () => {
    expect(typeColor("fire")).toContain("bg-orange-500");
    expect(typeColor("water")).toContain("bg-sky-500");
  });
  it("is case-insensitive", () => {
    expect(typeColor("Electric")).toBe(typeColor("electric"));
  });
  it("falls back to a neutral style for unknown or empty names", () => {
    expect(typeColor("shadow")).toContain("bg-muted");
    expect(typeColor("")).toContain("bg-muted");
  });
  it("covers all 18 types with distinct entries", () => {
    const types = [
      "normal",
      "fire",
      "water",
      "electric",
      "grass",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
    ];
    const colors = types.map(typeColor);
    expect(colors.every((c) => !c.includes("bg-muted"))).toBe(true);
    expect(new Set(colors).size).toBe(18);
  });
});
