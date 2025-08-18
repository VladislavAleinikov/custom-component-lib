import * as styles from "./checkbox.module.scss";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const Checkbox = ({
  label,
  className = "",
  ...props
}: CheckboxProps) => {
  return (
    <label className={`${styles.container} ${className}`}>
      {label}
      <input className={styles.input} type="checkbox" {...props} />
      <span className={styles.checkmark} />
    </label>
  );
};
