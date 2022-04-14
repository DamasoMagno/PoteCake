import { useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

import { Container, Content } from "./styles";

export function Header() {
  const [ menuVisible, setMenuVisible ] = useState(false);

  return (
    <Container>
      <Content>
        <Link href="/">
          <h2 className="logo">
            Pote<strong>Cake</strong>
          </h2>
        </Link>

        <nav className={menuVisible && "mobileMenu"}>
          <Link href="/">Inicio</Link>
          <Link href="/Products">Produtos</Link>
          <Link href="/Cart"> Carrinho</Link>
        </nav>

        <button onClick={() => setMenuVisible(false)} className="closeMenu">
          <MdClose />
        </button>
        <button onClick={() => setMenuVisible(true)} className="openMenu">
          <FiMenu />
        </button>
      </Content>
    </Container>
  );
}