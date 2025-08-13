import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { TextField } from "../components/text-field";

jest.mock("../components/text-field/text-field.module.scss", () => ({
  "text-field": "text-field",
  error: "error",
  box: "box",
  input: "input",
  label: "label",
  "helper-text": "helper-text",
}));

describe("TextField Component", () => {
  const mockLabel = "Test Field";
  const mockHelperText = "Helper information";
  const mockOnChange = jest.fn();

  afterEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with default props", () => {
    render(<TextField label={mockLabel} />);

    const container = screen.getByTestId("text-field-container");
    expect(container).toHaveClass("text-field");
    expect(container).not.toHaveClass("error");

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("input");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("type", "text");

    const label = screen.getByText(mockLabel);
    expect(label).toHaveClass("label");

    expect(screen.queryByText(mockHelperText)).not.toBeInTheDocument();
  });

  it("handles error state correctly", () => {
    render(<TextField label={mockLabel} error helperText={mockHelperText} />);

    const container = screen.getByTestId("text-field-container");
    expect(container).toHaveClass("error");

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.queryByText(mockLabel)).not.toBeInTheDocument();

    const helperText = screen.getByText(mockHelperText);
    expect(helperText).toHaveClass("helper-text");
  });

  it("displays helper text when provided", () => {
    render(<TextField label={mockLabel} helperText={mockHelperText} />);

    const helperText = screen.getByText(mockHelperText);
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("helper-text");
  });

  it("merges custom className", () => {
    render(<TextField label={mockLabel} className="custom-class" />);

    const container = screen.getByTestId("text-field-container");
    expect(container).toHaveClass("text-field");
    expect(container).toHaveClass("custom-class");
  });

  it("passes all input attributes correctly", () => {
    render(
      <TextField
        label={mockLabel}
        id="test-field"
        name="username"
        type="email"
        placeholder="Enter email"
        value="test@example.com"
        onChange={mockOnChange}
        disabled
        required={false}
        data-testid="custom-input"
      />
    );

    const input = screen.getByTestId("custom-input");

    expect(input).toHaveAttribute("id", "test-field");
    expect(input).toHaveAttribute("name", "username");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Enter email");
    expect(input).toHaveValue("test@example.com");
    expect(input).toBeDisabled();
    expect(input).not.toBeRequired();

    fireEvent.change(input, { target: { value: "new@example.com" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("overrides default required attribute", () => {
    render(<TextField label={mockLabel} required={false} />);

    const input = screen.getByRole("textbox");
    expect(input).not.toBeRequired();
  });

  it("applies disabled state correctly", () => {
    render(<TextField label={mockLabel} disabled />);

    const input = screen.getByRole("textbox");
    const container = screen.getByTestId("text-field-container");

    expect(input).toBeDisabled();
    expect(container).toHaveClass("text-field");
  });

  it("updates value correctly", () => {
    const { rerender } = render(
      <TextField label={mockLabel} value="initial" onChange={mockOnChange} />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("initial");

    fireEvent.change(input, { target: { value: "updated" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);

    rerender(
      <TextField label={mockLabel} value="controlled" onChange={mockOnChange} />
    );
    expect(input).toHaveValue("controlled");
  });
});
