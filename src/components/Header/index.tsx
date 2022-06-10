import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiShoppingCart, FiShoppingBag } from "react-icons/fi";
import { MdClose, MdMenu } from "react-icons/md";

import { useCart } from "src/context/CartContext";

import styles from "./styles.module.scss";

export function Header() {
  const { pathname } = useRouter();

  const { cart } = useCart();
  const productsInCart = cart.length;

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    setMenuIsOpen(false);
  }, [pathname]);

  return (
    <header className={styles.headerContainer}>
      <div className={`${styles.content} ${menuIsOpen && styles.active}`}>
        <Link href="/">
          <h2>PoteCake.</h2>
        </Link>

        <nav>
          <Link href="/">
            <li>Inicio</li>
          </Link>
          <Link href="/menu">
            <li>Cardápio</li>
          </Link>
          <Link href="/contact">
            <li>Contato</li>
          </Link>
          <Link href="/cart">
            <div className={styles.cart}>
              <FiShoppingBag size={24} />
              <span>{productsInCart}</span>
            </div>
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
