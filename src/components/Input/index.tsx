import { ComponentType, InputHTMLAttributes, LegacyRef } from "react";
import { IconBaseProps } from "react-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ComponentType<IconBaseProps>;
  iconPosition?: "left" | "right";
  inputRef?: LegacyRef<HTMLInputElement>
}

interface SelectProps extends InputProps { }

import styles from "./styles.module.scss";

export function Input({
  icon: Icon,
  iconPosition,
  inputRef,
  ...props
}: InputProps) {
  return (
    <div className={styles.container}>
      <input {...props} />
      {Icon && <Icon style={{ order: iconPosition === "right" && 1 }} />}
    </div>
  );
}
