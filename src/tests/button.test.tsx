import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../components/button";

jest.mock("../components/checkbox/button.module.scss", () => ({
  button: "button",
  small: "small",
  medium: "medium",
  large: "large",
  text: "text",
  contained: "contained",
  outlined: "outlined",
}));

describe("Button Component", () => {
  const mockProps = {
    onClick: jest.fn(),
    children: "Test Button",
  };

  it("renders with default contained variant and medium size", () => {
    render(<Button size="medium">Click me</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("button");
    expect(button).toHaveClass("contained");
    expect(button).toHaveClass("medium");
  });

  it.each([
    ["text", "small"],
    ["outlined", "medium"],
    ["contained", "large"],
  ])("applies correct %s variant and %s size classes", (variant, size) => {
    render(
      <Button
        variant={variant as "text" | "contained" | "outlined"}
        size={size as "small" | "medium" | "large"}
      >
        {variant} {size}
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(variant);
    expect(button).toHaveClass(size);
  });

  it("merges custom className with base classes", () => {
    render(
      <Button size="medium" className="custom-class">
        Custom Class
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("button");
    expect(button).toHaveClass("contained");
    expect(button).toHaveClass("medium");
    expect(button).toHaveClass("custom-class");
  });

  it("renders children content correctly", () => {
    render(
      <Button size="medium">
        <span>Child content</span>
      </Button>
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("triggers onClick handler when clicked", () => {
    render(<Button size="medium" {...mockProps} />);

    fireEvent.click(screen.getByRole("button"));
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("applies disabled attribute and prevents clicks", () => {
    render(
      <Button size="medium" disabled {...mockProps}>
        Disabled
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(mockProps.onClick).not.toHaveBeenCalled();
  });

  it("passes other HTML attributes to the button element", () => {
    render(
      <Button
        size="medium"
        id="submit-button"
        type="submit"
        aria-label="Submit form"
        data-testid="custom-button"
      >
        Submit
      </Button>
    );

    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("id", "submit-button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("aria-label", "Submit form");
  });
});
