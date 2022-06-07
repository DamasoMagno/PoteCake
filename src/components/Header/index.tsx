import Link from "next/link";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { MdClose, MdMenu } from "react-icons/md";

import { useCart } from "src/context/CartContext";

import styles from "./styles.module.scss";

export function Header() {
  const { cart } = useCart();
  const productsInCart = cart.length;

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <header className={styles.headerContainer}>
      <div className={`${styles.content} ${menuIsOpen && styles.active}`}>
        <Link href="">
          <h2>PoteCake.</h2>
        </Link>

        <nav>
          <Link href="/">
            <li>Inicio</li>
          </Link>
          <Link href="/menu">
            <li>Cardápio</li>
          </Link>
          <Link href="/cart">
            <li className={styles.cart}>
              <FiShoppingCart size={24} />
              <span>{productsInCart}</span>
            </li>
          </Link>
        </nav>

        <button
          className={styles.open}
          onClick={() => setMenuIsOpen(true)}
        >
          <MdMenu />
        </button>
        <button
          className={styles.close}
          onClick={() => setMenuIsOpen(false)}
        >
          <MdClose />
        </button>
      </div>
    </header>
  );
}
