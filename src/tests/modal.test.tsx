import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../components/modal";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (element: React.ReactNode) => element,
}));

jest.mock("../components/modal/modal.module.scss", () => ({
  foreground: "foreground",
  open: "open",
  box: "box",
}));

beforeEach(() => {
  document.body.innerHTML = "";
});

afterEach(() => {
  document.body.style.overflow = "";
});

describe("Modal Component", () => {
  const mockOnClose = jest.fn();
  const modalContent = <div data-testid="modal-content">Test Content</div>;

  it("hidden when closed", () => {
    render(<Modal open={false} onClose={mockOnClose} />);
    expect(screen.queryByTestId("modal-foreground")).not.toHaveClass("open");
  });

  it("visible when open with correct classes", () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        {modalContent}
      </Modal>,
    );

    const foreground = screen.getByTestId("modal-foreground");
    const box = screen.getByTestId("modal-box");

    expect(foreground).toHaveClass("foreground");
    expect(foreground).toHaveClass("open");
    expect(box).toHaveClass("box");
    expect(screen.getByTestId("modal-content")).toBeInTheDocument();
  });

  it("applies custom className to box", () => {
    render(
      <Modal open={true} onClose={mockOnClose} className="custom-class">
        {modalContent}
      </Modal>,
    );

    const box = screen.getByTestId("modal-box");
    expect(box).toHaveClass("box");
    expect(box).toHaveClass("custom-class");
  });

  it("handle onClose event when clicking on background", async () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        {modalContent}
      </Modal>,
    );

    const foreground = screen.getByTestId("modal-foreground");
    fireEvent.click(foreground);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not handle onClose event when clicking inside box", () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        {modalContent}
      </Modal>,
    );

    const box = screen.getByTestId("modal-box");
    fireEvent.click(box);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("stops propagation when clicking inside box", () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        <button data-testid="modal-button">Click</button>
      </Modal>,
    );

    const button = screen.getByTestId("modal-button");
    fireEvent.click(button);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("sets body overflow to hidden when open", () => {
    const { rerender } = render(<Modal open={false} onClose={mockOnClose} />);
    expect(document.body.style.overflow).toBe("unset");

    rerender(<Modal open={true} onClose={mockOnClose} />);
    expect(document.body.style.overflow).toBe("hidden");

    rerender(<Modal open={false} onClose={mockOnClose} />);
    expect(document.body.style.overflow).toBe("unset");
  });

  it("cleans up body overflow on unmount", () => {
    const { unmount } = render(<Modal open={true} onClose={mockOnClose} />);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("unset");
  });

  it("renders children content correctly", () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        <h1>Modal Title</h1>
        <p>Modal description</p>
      </Modal>,
    );

    expect(
      screen.getByRole("heading", { name: "Modal Title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Modal description")).toBeInTheDocument();
  });

  it("removes open class when closed", () => {
    const { rerender } = render(<Modal open={true} onClose={mockOnClose} />);
    expect(screen.getByTestId("modal-foreground")).toHaveClass("open");

    rerender(<Modal open={false} onClose={mockOnClose} />);
    expect(screen.getByTestId("modal-foreground")).not.toHaveClass("open");
  });
});
