import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Favorites } from "./Favorites";

const favorites = [
  { id: 25, name: "pikachu" },
  { id: 6, name: "charizard" },
];

describe("Favorites", () => {
  it("shows an empty state", () => {
    render(
      <Favorites favorites={[]} onSelect={() => {}} onRemove={() => {}} />,
    );
    expect(screen.getByText("No favorites yet.")).toBeTruthy();
  });

  it("lists favorites and removes by id", () => {
    const onRemove = vi.fn();
    render(
      <Favorites
        favorites={favorites}
        onSelect={() => {}}
        onRemove={onRemove}
      />,
    );
    expect(screen.getByText(/ pikachu$/)).toBeTruthy();
    expect(screen.getByText(/ charizard$/)).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Remove charizard from favorites"));
    expect(onRemove).toHaveBeenCalledWith(6);
  });

  it("selects a favorite", () => {
    const onSelect = vi.fn();
    render(
      <Favorites
        favorites={favorites}
        onSelect={onSelect}
        onRemove={() => {}}
      />,
    );
    fireEvent.click(screen.getByText(/ pikachu$/));
    expect(onSelect).toHaveBeenCalledWith("pikachu");
  });
});
