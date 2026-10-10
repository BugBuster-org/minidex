import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("favorites a pokemon from the detail view and removes it again", async () => {
    render(<App />);
    fireEvent.click(await screen.findByText("#001 bulbasaur"));
    fireEvent.click(await screen.findByText("Add to favorites"));
    expect(
      screen.getByLabelText("Remove bulbasaur from favorites"),
    ).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Remove bulbasaur from favorites"));
    expect(screen.getByText("No favorites yet.")).toBeTruthy();
  });
});
