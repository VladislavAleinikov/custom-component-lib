import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Switch } from "../components/switch";

jest.mock("../components/switch/switch.module.scss", () => ({
  switch: "switch",
  input: "input",
  slider: "slider",
  checked: "checked",
  disabled: "disabled",
}));

describe("Switch Component", () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with default props", () => {
    render(<Switch onChange={mockOnChange} />);

    const label = screen.getByRole("checkbox").closest("label");
    const input = screen.getByRole("checkbox");
    const slider = screen.getByTestId("slider");

    expect(label).toHaveClass("switch");
    expect(input).toHaveClass("input");
    expect(input).not.toBeChecked();
    expect(input).not.toBeDisabled();
    expect(slider).toHaveClass("slider");
    expect(slider).not.toHaveClass("checked");
  });

  it("toggles when clicked", () => {
    render(<Switch onChange={mockOnChange} />);

    const switchElement = screen.getByRole("checkbox");
    fireEvent.click(switchElement);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("applies disabled state correctly", () => {
    render(<Switch disabled={true} onChange={mockOnChange} />);

    const label = screen.getByRole("checkbox").closest("label");
    const switchElement = screen.getByRole("checkbox");

    expect(switchElement).toBeDisabled();

    fireEvent.click(label);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("merges custom className", () => {
    render(<Switch className="custom-class" onChange={mockOnChange} />);

    const label = screen.getByRole("checkbox").closest("label");
    expect(label).toHaveClass("switch");
    expect(label).toHaveClass("custom-class");
  });

  it("combines checked and disabled states", () => {
    render(<Switch checked={true} disabled={true} onChange={mockOnChange} />);

    const label = screen.getByRole("checkbox").closest("label");
    const switchElement = screen.getByRole("checkbox");
    const slider = screen.getByTestId("slider");

    expect(switchElement).toBeChecked();
    expect(switchElement).toBeDisabled();
    expect(slider).toHaveClass("slider");

    fireEvent.click(label);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("updates when controlled", () => {
    const { rerender } = render(
      <Switch checked={false} onChange={mockOnChange} />,
    );

    const switchElement = screen.getByRole("checkbox");

    expect(switchElement).not.toBeChecked();

    fireEvent.click(switchElement);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(switchElement).not.toBeChecked();

    rerender(<Switch checked={true} onChange={mockOnChange} />);
    expect(switchElement).toBeChecked();
  });
});