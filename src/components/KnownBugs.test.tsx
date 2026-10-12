import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KnownBugs } from "./KnownBugs";

describe("KnownBugs", () => {
  it("lists the planted bugs", () => {
    render(<KnownBugs />);
    expect(screen.getByText("Known bugs")).toBeTruthy();
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });
});
