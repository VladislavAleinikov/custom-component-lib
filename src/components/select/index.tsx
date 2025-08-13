import { useState } from "react";
import * as styles from "./select.module.scss";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: SelectOption;
  label: string;
  onChange: (newValue: SelectOption) => void;
  className?: string;
}

export const Select = ({
  options,
  label,
  value,
  onChange,
  className = "",
}: SelectProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<SelectOption | undefined>(
    value,
  );

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const onItemClick = (option: SelectOption) => {
    const newValue = option;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option: SelectOption) => {
    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  return (
    <div
      className={`${styles.container}  ${
        selectedValue || showMenu ? styles.selected : ""
      } ${className}`}
      data-testid="select-container"
    >
      <div
        onClick={handleInputClick}
        className={styles.input}
        data-testid="select-input"
      >
        <div className={styles.label}>{label}</div>
        <div data-testid="selected-value">{selectedValue?.label}</div>
        <div
          className={`${styles.tool} ${showMenu ? styles.translate : ""}`}
          data-testid="select-tool"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            stroke="#222"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {showMenu && (
        <div className={styles["dropdown-menu"]} data-testid="dropdown-menu">
          {options.map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`${styles["dropdown-item"]} ${
                isSelected(option) && styles.selected
              }`}
              data-testid="dropdown-item"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
