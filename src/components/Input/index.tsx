import {
  ComponentType,
  FC,
  InputHTMLAttributes,
  LegacyRef
} from "react";
import { IconBaseProps } from "react-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ComponentType<IconBaseProps>;
  iconPosition?: "left" | "right";
  inputRef?: LegacyRef<HTMLInputElement>
}

import styles from "./styles.module.scss";

export const Input: FC<InputProps> = ({
  icon: Icon,
  iconPosition,
  inputRef,
  ...props
}) => {
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