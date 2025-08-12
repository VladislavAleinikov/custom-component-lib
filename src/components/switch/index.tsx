import * as styles from "./switch.module.scss";

interface CheckboxProps {
  checked?: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
}

export const Switch = ({
  checked = false,
  onChange,
  disabled = false,
  className = "",
}: CheckboxProps) => {
  return (
    <label className={`${styles.switch} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.input}
      />
      <span className={styles.slider} data-testid="slider" />
    </label>
  );
};
