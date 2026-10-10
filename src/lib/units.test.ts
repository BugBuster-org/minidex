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
  it("converts hectograms to kilograms", () => {
    expect(hectogramsToKg(60)).toBe(6);
    expect(hectogramsToKg(905)).toBe(90.5);
  });
  it("handles zero", () => {
    expect(hectogramsToKg(0)).toBe(0);
  });
});
