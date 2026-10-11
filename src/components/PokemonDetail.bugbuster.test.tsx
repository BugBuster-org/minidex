import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PokemonDetail } from "./PokemonDetail";

const noop = () => {};

function barWidth(statName: string): number {
  const row = screen.getByText(statName).closest("tr") as HTMLElement;
  const bar = row.querySelector("div.bg-primary") as HTMLElement;
  return Number.parseFloat(bar.style.width);
}

describe("PokemonDetail stat bars", () => {
  it("draws bars proportionally to the max base stat of 255", async () => {
    render(
      <PokemonDetail
        name="pikachu"
        isFavorite={false}
        onToggleFavorite={noop}
        onBack={noop}
      />,
    );
    await screen.findByText(/ pikachu$/);
    expect(barWidth("hp")).toBeLessThan(20);
    expect(barWidth("speed")).toBeLessThan(40);
    expect(barWidth("speed")).toBeGreaterThan(barWidth("hp"));
  });
});
