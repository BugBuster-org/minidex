import { describe, expect, it } from "vitest";
import { formatId } from "./format";

describe("formatId padding", () => {
  it("pads ids to three digits", () => {
    expect(formatId(1)).toBe("#001");
    expect(formatId(25)).toBe("#025");
    expect(formatId(150)).toBe("#150");
  });
});
