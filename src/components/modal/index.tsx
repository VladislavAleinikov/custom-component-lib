import { createPortal } from "react-dom";
import * as styles from "./modal.module.scss";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Modal = ({
  open,
  onClose,
  className = "",
  children,
}: ModalProps) => {
  const handleBoxClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return createPortal(
    <div
      className={`${styles.foreground} ${open && styles.open}`}
      onClick={onClose}
      data-testid="modal-foreground"
    >
      <div
        className={`${styles.box} ${className}`}
        onClick={handleBoxClick}
        data-testid="modal-box"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
