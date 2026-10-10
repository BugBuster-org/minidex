import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PokemonList } from "./PokemonList";

describe("PokemonList", () => {
  it("shows the first page and paginates", async () => {
    render(<PokemonList onSelect={() => {}} />);
    expect(await screen.findByText(/ bulbasaur$/)).toBeTruthy();
    expect(screen.getByText("Page 1 of 68")).toBeTruthy();
    expect((screen.getByText("Previous") as HTMLButtonElement).disabled).toBe(
      true,
    );

    fireEvent.click(screen.getByText("Next"));
    expect(await screen.findByText(/ spearow$/)).toBeTruthy();
    expect(screen.getByText("Page 2 of 68")).toBeTruthy();
    expect(screen.queryByText(/ bulbasaur$/)).toBeNull();
  });

  it("filters by name, ignoring case", async () => {
    render(<PokemonList onSelect={() => {}} />);
    await screen.findByText(/ bulbasaur$/);
    fireEvent.change(screen.getByLabelText("Search by name"), {
      target: { value: "CHARI" },
    });
    expect(screen.getByText(/ charizard$/)).toBeTruthy();
    expect(screen.queryByText(/ bulbasaur$/)).toBeNull();
  });

  it("filters by any of a pokemon's types", async () => {
    render(<PokemonList onSelect={() => {}} />);
    await screen.findByText(/ bulbasaur$/);
    const select = screen.getByLabelText("Filter by type");
    fireEvent.change(select, { target: { value: "flying" } });
    expect(screen.getByText(/ charizard$/)).toBeTruthy();
    expect(screen.queryByText(/ bulbasaur$/)).toBeNull();
    fireEvent.change(select, { target: { value: "poison" } });
    expect(screen.getByText(/ bulbasaur$/)).toBeTruthy();
    expect(screen.queryByText(/ charizard$/)).toBeNull();
  });

  it("reports the selected pokemon", async () => {
    const onSelect = vi.fn();
    render(<PokemonList onSelect={onSelect} />);
    fireEvent.click(await screen.findByText(/ bulbasaur$/));
    expect(onSelect).toHaveBeenCalledWith("bulbasaur");
  });
});
