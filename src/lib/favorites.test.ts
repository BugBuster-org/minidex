import { describe, expect, it } from "vitest";
import {
  addFavorite,
  isFavorite,
  removeFavorite,
  toggleFavorite,
} from "./favorites";

const pikachu = { id: 25, name: "pikachu" };
const charizard = { id: 6, name: "charizard" };

describe("favorites", () => {
  it("adds a favorite", () => {
    expect(addFavorite([], pikachu)).toEqual([pikachu]);
    expect(addFavorite([pikachu], charizard)).toEqual([pikachu, charizard]);
  });
  it("does not add duplicates", () => {
    expect(addFavorite([pikachu], pikachu)).toEqual([pikachu]);
  });
  it("removes by id", () => {
    expect(removeFavorite([pikachu, charizard], 25)).toEqual([charizard]);
  });
  it("ignores removal of an unknown id and empty input", () => {
    expect(removeFavorite([pikachu], 1)).toEqual([pikachu]);
    expect(removeFavorite([], 1)).toEqual([]);
  });
  it("toggles on and off", () => {
    const on = toggleFavorite([], pikachu);
    expect(on).toEqual([pikachu]);
    expect(toggleFavorite(on, pikachu)).toEqual([]);
  });
  it("reports membership", () => {
    expect(isFavorite([pikachu], 25)).toBe(true);
    expect(isFavorite([pikachu], 6)).toBe(false);
  });
  it("does not mutate its input", () => {
    const original = [pikachu];
    addFavorite(original, charizard);
    removeFavorite(original, 25);
    toggleFavorite(original, charizard);
    expect(original).toEqual([pikachu]);
  });
});
