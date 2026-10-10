import { describe, expect, it } from "vitest";
import { decimetersToMeters, hectogramsToKg } from "./units";

describe("decimetersToMeters", () => {
  it("converts decimeters to meters", () => {
    expect(decimetersToMeters(4)).toBe(0.4);
    expect(decimetersToMeters(17)).toBe(1.7);
  });
  it("handles zero", () => {
    expect(decimetersToMeters(0)).toBe(0);
  });
});

describe("hectogramsToKg", () => {
  it("handles zero", () => {
    expect(hectogramsToKg(0)).toBe(0);
  });
});
