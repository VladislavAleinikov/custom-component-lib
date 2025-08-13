import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "../components/checkbox";

jest.mock("../components/checkboxcheckbox.module.scss", () => ({
  container: "container",
  input: "input",
  checkmark: "checkmark",
}));

describe("Checkbox Component", () => {
  const mockOnChange = jest.fn();

  it("renders with label", () => {
    render(<Checkbox label="Test Label" />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("passes HTML attributes to input", () => {
    render(
      <Checkbox
        id="test-checkbox"
        name="agreement"
        value="accept"
        disabled
        data-testid="custom-checkbox"
      />
    );

    const checkbox = screen.getByTestId("custom-checkbox");
    expect(checkbox).toHaveAttribute("id", "test-checkbox");
    expect(checkbox).toHaveAttribute("name", "agreement");
    expect(checkbox).toHaveAttribute("value", "accept");
    expect(checkbox).toBeDisabled();
  });

  it("handles checked state", () => {
    render(<Checkbox onChange={mockOnChange} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it("handles change events", () => {
    render(<Checkbox onChange={mockOnChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    const event = mockOnChange.mock.calls[0][0];
    expect(event.target.checked).toBe(true);
  });

  it("applies custom className to container", () => {
    render(<Checkbox className="custom-class" />);

    const container = screen.getByRole("checkbox").closest("label");
    expect(container).toHaveClass("container");
    expect(container).toHaveClass("custom-class");
  });

  it("toggles when label text is clicked", () => {
    render(<Checkbox label="Accept terms" onChange={mockOnChange} />);

    const labelText = screen.getByText("Accept terms");
    fireEvent.click(labelText);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
