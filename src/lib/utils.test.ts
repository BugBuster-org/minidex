import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins class names and skips falsy values", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });

  it("lets later Tailwind classes win a conflict", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("returns an empty string for no input", () => {
    expect(cn()).toBe("");
  });
});
