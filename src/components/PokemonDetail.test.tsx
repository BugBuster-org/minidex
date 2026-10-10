import { fireEvent, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { API_BASE } from "../api/pokeapi";
import { server } from "../test/server";
import { PokemonDetail } from "./PokemonDetail";

const noop = () => {};

describe("PokemonDetail", () => {
  it("shows id, name, sprite, types, height, weight, stats and total", async () => {
    render(
      <PokemonDetail
        name="pikachu"
        isFavorite={false}
        onToggleFavorite={noop}
        onBack={noop}
      />,
    );
    expect(await screen.findByText(/ pikachu$/)).toBeTruthy();
    expect(screen.getByAltText("pikachu").getAttribute("src")).toContain(
      "/25.png",
    );
    expect(screen.getByText("Types: electric")).toBeTruthy();
    expect(screen.getByText("Height: 0.4 m")).toBeTruthy();
    expect(screen.getByText(/^Weight:/)).toBeTruthy();
    expect(screen.getByText("speed").nextSibling?.textContent).toBe("90");
    expect(screen.getByText("total").nextSibling?.textContent).toBe("320");
  });

  it("lists every type of a dual-type pokemon", async () => {
    render(
      <PokemonDetail
        name="charizard"
        isFavorite={false}
        onToggleFavorite={noop}
        onBack={noop}
      />,
    );
    expect(await screen.findByText("Types: fire, flying")).toBeTruthy();
    expect(screen.getByText("Height: 1.7 m")).toBeTruthy();
    expect(screen.getByText(/^Weight:/)).toBeTruthy();
  });

  it("toggles favorite and goes back", async () => {
    const onToggleFavorite = vi.fn();
    const onBack = vi.fn();
    render(
      <PokemonDetail
        name="bulbasaur"
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
        onBack={onBack}
      />,
    );
    fireEvent.click(await screen.findByText("Add to favorites"));
    expect(onToggleFavorite).toHaveBeenCalledWith({ id: 1, name: "bulbasaur" });
    fireEvent.click(screen.getByText("Back"));
    expect(onBack).toHaveBeenCalled();
  });

  it("offers removal when already a favorite", async () => {
    render(
      <PokemonDetail
        name="bulbasaur"
        isFavorite
        onToggleFavorite={noop}
        onBack={noop}
      />,
    );
    expect(await screen.findByText("Remove from favorites")).toBeTruthy();
  });

  it("shows an error when the request fails", async () => {
    server.use(
      http.get(`${API_BASE}/pokemon/:nameOrId`, () =>
        HttpResponse.json({}, { status: 500 }),
      ),
    );
    render(
      <PokemonDetail
        name="pikachu"
        isFavorite={false}
        onToggleFavorite={noop}
        onBack={noop}
      />,
    );
    expect((await screen.findByRole("alert")).textContent).toContain("500");
  });
});
