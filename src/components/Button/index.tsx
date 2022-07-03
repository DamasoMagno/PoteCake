import { ButtonHTMLAttributes, ComponentType } from "react";
import { IconBaseProps } from "react-icons/lib";

import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  iconPosition?: "left" | "right";
  icon?: ComponentType<IconBaseProps>;
}

export function Button({
  label,
  icon: Icon,
  iconPosition = "left",
  ...props
}: ButtonProps) {
  return (
    <button
      className={styles.container}
      {...props}
    >
      <span >{label}</span>
      {Icon && <Icon style={{ order: iconPosition === "right" && 1 }} />}
    </button>
  );
}