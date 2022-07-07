import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { MdClose, MdMenu } from "react-icons/md";

import { useCart } from "@contexts/CartContext";

import styles from "./styles.module.scss";

export function Header() {
  const { pathname } = useRouter();

  const { cart } = useCart();
  const productsInCart = cart.length;

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function openMenu() {
    setMenuIsOpen(true);
  }

  function closeMenu() {
    setMenuIsOpen(false);
  }

  useEffect(() => {
    setMenuIsOpen(false);
  }, [pathname]);

  return (
    <header className={styles.headerContainer}>
      <div className={`
        ${styles.content} 
        ${menuIsOpen && styles.active}
      `}>
        <Link href="/">
          <h2 className={styles.logo}>
            Pote<strong>Cake.</strong>
          </h2>
        </Link>

        <nav>
          <Navigation
            url="/"
            label="Início"
          />
          <Navigation
            url="/menu"
            label="Cardápio"
          />
        </nav>

        <div className={styles.options}>
          <Link href="/cart">
            <div className={styles.cart}>
              <FiShoppingBag size={24} />
              <span>{productsInCart}</span>
            </div>
          </Link>

          <button
            className={styles.close}
            onClick={closeMenu}
          >
            <MdClose />
          </button>

          <button
            className={styles.open}
            onClick={openMenu}
          >
            <MdMenu />
          </button>
        </div>
      </div>
    </header>
  );
}

function Navigation({ url, label }: any) {
  const { pathname } = useRouter();

  function checkCurrentPage() {
    return pathname === String(url) ? "linkActive" : null;
  }

  return (
    <Link href={`${url}`}>
      <li className={styles[checkCurrentPage()]}>
        {label}
      </li>
    </Link>
  );
}