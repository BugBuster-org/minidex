import { describe, expect, it } from "vitest";
import { hectogramsToKg } from "./units";

describe("hectogramsToKg regression", () => {
  it("converts Pikachu's 60 hectograms to 6 kg", () => {
    expect(hectogramsToKg(60)).toBe(6);
  });
  it("converts 10 hectograms to 1 kg", () => {
    expect(hectogramsToKg(10)).toBe(1);
  });
});
