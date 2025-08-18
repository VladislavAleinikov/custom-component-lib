import * as styles from "./button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "text" | "contained" | "outlined";
  size: "small" | "medium" | "large";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  size,
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};