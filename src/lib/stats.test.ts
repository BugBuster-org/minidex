import { describe, expect, it } from "vitest";
import { totalBaseStats } from "./stats";
import pikachu from "../fixtures/pikachu.json";

describe("totalBaseStats", () => {
  it("sums base stats", () => {
    expect(totalBaseStats([{ base_stat: 10 }, { base_stat: 20 }])).toBe(30);
  });
  it("returns 0 for empty input", () => {
    expect(totalBaseStats([])).toBe(0);
  });
  it("matches the known total for pikachu", () => {
    expect(totalBaseStats(pikachu.stats)).toBe(320);
  });
});
