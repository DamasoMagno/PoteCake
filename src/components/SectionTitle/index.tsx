import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

interface SectionTitle {
  children: ReactNode;
}

export const SectionTitle: FC<SectionTitle> = 
({ children }) => (
  <h2 className={styles.title}>
    {children}
  </h2>
);