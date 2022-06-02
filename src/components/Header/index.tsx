import Link from "next/link";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <nav>
        <Link href="/">
          <li>Inicio</li>
        </Link>
        <Link href="/menu">
          <li>Menu</li>
        </Link>
        <Link href="/cart">
          <li>Carrinho</li>
        </Link>
      </nav>
    </header>
  );
}
