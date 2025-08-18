import * as styles from "./text-field.module.scss";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  helperText?: string;
  className?: string;
}

export const TextField = ({
  label,
  error,
  helperText,
  className = "",
  ...props
}: TextFieldProps) => {
  return (
    <div
      className={`${styles["text-field"]} ${
        error ? styles.error : ""
      } ${className}`}
      data-testid="text-field-container"
    >
      <label>
        <input required type="text" className={styles.input} {...props} />
        <span className={styles.label}>{error ? "Error" : label}</span>
        {helperText && <p className={styles["helper-text"]}>{helperText}</p>}
      </label>
    </div>
  );
};
