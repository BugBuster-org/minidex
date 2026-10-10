import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PokemonList } from "./PokemonList";

describe("PokemonList", () => {
  it("shows the first page and paginates", async () => {
    render(<PokemonList onSelect={() => {}} />);
    expect(await screen.findByText("#001 bulbasaur")).toBeTruthy();
    expect(screen.getByText("Page 1 of 68")).toBeTruthy();
    expect((screen.getByText("Previous") as HTMLButtonElement).disabled).toBe(
      true,
    );

    fireEvent.click(screen.getByText("Next"));
    expect(await screen.findByText("#021 spearow")).toBeTruthy();
    expect(screen.getByText("Page 2 of 68")).toBeTruthy();
    expect(screen.queryByText("#001 bulbasaur")).toBeNull();
  });

  it("filters by name, ignoring case", async () => {
    render(<PokemonList onSelect={() => {}} />);
    await screen.findByText("#001 bulbasaur");
    fireEvent.change(screen.getByLabelText("Search by name"), {
      target: { value: "CHARI" },
    });
    expect(screen.getByText("#006 charizard")).toBeTruthy();
    expect(screen.queryByText("#001 bulbasaur")).toBeNull();
  });

  it("filters by any of a pokemon's types", async () => {
    render(<PokemonList onSelect={() => {}} />);
    await screen.findByText("#001 bulbasaur");
    const select = screen.getByLabelText("Filter by type");
    fireEvent.change(select, { target: { value: "flying" } });
    expect(screen.getByText("#006 charizard")).toBeTruthy();
    expect(screen.queryByText("#001 bulbasaur")).toBeNull();
    fireEvent.change(select, { target: { value: "poison" } });
    expect(screen.getByText("#001 bulbasaur")).toBeTruthy();
    expect(screen.queryByText("#006 charizard")).toBeNull();
  });

  it("reports the selected pokemon", async () => {
    const onSelect = vi.fn();
    render(<PokemonList onSelect={onSelect} />);
    fireEvent.click(await screen.findByText("#001 bulbasaur"));
    expect(onSelect).toHaveBeenCalledWith("bulbasaur");
  });
});
