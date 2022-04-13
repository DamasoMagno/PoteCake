import { useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";

import { Container, Navigation } from "./styles";
import { MdClose } from "react-icons/md";

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <Container>
      <div className="headerContent">
        <h2>PoteCake</h2>

        <button
          onClick={() => setShowMobileMenu(true)}
          className="openMenu"
        >
          <FiMenu />
        </button>

        <Navigation mobileMenuIsVisible={showMobileMenu}>
          <button
            onClick={() => setShowMobileMenu(false)}
            className="closeMenu"
          >
            <MdClose />
          </button>

          <Link href="/">
            Inicio
          </Link>
          <Link href="/products">
            Produtos
          </Link>
          <Link href="/">
            Carrinho
          </Link>
        </Navigation>
      </div>
    </Container>
  );
}