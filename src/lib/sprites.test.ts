import { describe, expect, it } from "vitest";
import { spriteUrl } from "./sprites";

describe("spriteUrl", () => {
  it("builds the sprite url for an id", () => {
    expect(spriteUrl(25)).toMatch(/\/sprites\/pokemon\/25\.png$/);
  });
  it("does not pad or truncate ids", () => {
    expect(spriteUrl(1)).toMatch(/\/1\.png$/);
    expect(spriteUrl(10001)).toMatch(/\/10001\.png$/);
  });
});
