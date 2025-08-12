import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Select, SelectOption } from "../components/select";

jest.mock("../components/select/select.module.scss", () => ({
  container: "container",
  selected: "selected",
  input: "input",
  label: "label",
  "selected-value": "selected-value",
  tools: "tools",
  tool: "tool",
  translate: "translate",
  "dropdown-menu": "dropdown-menu",
  "dropdown-item": "dropdown-item",
}));

describe("Select Component", () => {
  const mockOptions: SelectOption[] = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];
  const mockLabel = "Test Select";
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders closed state correctly", () => {
    render(<Select options={mockOptions} label={mockLabel} onChange={mockOnChange} />);
    
    const container = screen.getByTestId("select-container");
    expect(container).toHaveClass("container");
    expect(container).not.toHaveClass("selected");
    
    expect(screen.getByText(mockLabel)).toBeInTheDocument();
    expect(screen.getByText(mockLabel)).toHaveClass("label");

    const valueDisplay = screen.getByTestId("selected-value");
    expect(valueDisplay).toBeEmptyDOMElement();
    
    expect(screen.queryByTestId("dropdown-menu")).not.toBeInTheDocument();
    
    const chevron = screen.getByTestId("select-tool");
    expect(chevron).toHaveClass("tool");
    expect(chevron).not.toHaveClass("translate");
  });

  it("opens dropdown when clicked", () => {
    render(<Select options={mockOptions} label={mockLabel} onChange={mockOnChange} />);
    
    fireEvent.click(screen.getByTestId("select-input"));
    
    expect(screen.getByTestId("select-container")).toHaveClass("selected");
    
    const dropdown = screen.getByTestId("dropdown-menu");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveClass("dropdown-menu");
    
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("selects an option and closes dropdown", () => {
    render(<Select options={mockOptions} label={mockLabel} onChange={mockOnChange} />);
    
    fireEvent.click(screen.getByTestId("select-input"));
    
    const optionToSelect = mockOptions[1];
    fireEvent.click(screen.getByText(optionToSelect.label));
    fireEvent.click(screen.getByTestId("select-input"));
    
    expect(screen.getByTestId("selected-value")).toHaveTextContent(optionToSelect.label);
    
    expect(screen.queryByTestId("dropdown-menu")).not.toBeInTheDocument();
    
    expect(mockOnChange).toHaveBeenCalledWith(optionToSelect);
    
    expect(screen.getByTestId("select-container")).toHaveClass("selected");
    
    expect(screen.getByTestId("select-tool")).not.toHaveClass("translate");
  });

  it("highlights selected option in dropdown", () => {
    const selectedOption = mockOptions[2];
    
    render(
      <Select 
        options={mockOptions} 
        label={mockLabel} 
        onChange={mockOnChange} 
      />,
    );
    
    fireEvent.click(screen.getByTestId("select-input"));
    
    const options = screen.getAllByTestId("dropdown-item");
    options.forEach(option => {
      expect(option).not.toHaveClass("selected");
    });
    
    fireEvent.click(screen.getByText(selectedOption.label));
    
    const updatedOptions = screen.getAllByTestId("dropdown-item");
    updatedOptions.forEach((option, index) => {
      if (mockOptions[index].value === selectedOption.value) {
        expect(option).toHaveClass("selected");
      } else {
        expect(option).not.toHaveClass("selected");
      }
    });
  });

  it("applies custom className to container", () => {
    render(
      <Select 
        options={mockOptions} 
        label={mockLabel} 
        onChange={mockOnChange} 
        className="custom-class" 
      />,
    );
    
    const container = screen.getByTestId("select-container");
    expect(container).toHaveClass("container");
    expect(container).toHaveClass("custom-class");
  });

  it("maintains selection when reopening dropdown", () => {
    const selectedOption = mockOptions[0];
    
    render(
      <Select 
        options={mockOptions} 
        label={mockLabel} 
        onChange={mockOnChange} 
      />,
    );
    
    fireEvent.click(screen.getByTestId("select-input"));
    fireEvent.click(screen.getByText(selectedOption.label));
    
    const selectedItem = screen.getAllByText(selectedOption.label)[1];
    expect(selectedItem).toHaveClass("selected");
  });

  it("renders without crashing when no options provided", () => {
    render(<Select options={[]} label={mockLabel} onChange={mockOnChange} />);
    
    fireEvent.click(screen.getByTestId("select-input"));
    
    const dropdown = screen.getByTestId("dropdown-menu");
    expect(dropdown).toBeInTheDocument();
    expect(within(dropdown).queryAllByTestId("dropdown-item")).toHaveLength(0);
  });
});