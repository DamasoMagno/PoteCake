import { ComponentType, InputHTMLAttributes, LegacyRef } from "react";
import { IconBaseProps } from "react-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ComponentType<IconBaseProps>;
  iconPosition?: "left" | "right";
  inputRef?: LegacyRef<HTMLInputElement>
}

import styles from "./styles.module.scss";

export function Input({
  icon: Icon,
  iconPosition,
  inputRef,
  ...props
}: InputProps) {
  return (
    <div className={styles.container}>
      <input
        {...props}
        ref={inputRef}
      />
      {Icon && <Icon className={iconPosition ? styles.right : styles.left} />}
    </div>
  );
}