import { describe, expect, it } from "vitest";
import { hectogramsToKg } from "./units";

describe("hectogramsToKg weight conversion", () => {
  it("converts 60 hectograms (Pikachu) to exactly 6 kg", () => {
    expect(hectogramsToKg(60)).toBe(6);
  });
  it("converts 100 hectograms to 10 kg", () => {
    expect(hectogramsToKg(100)).toBe(10);
  });
});
