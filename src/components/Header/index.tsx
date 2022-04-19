import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

import { Container, Content } from "./styles";

export function Header() {
  const { pathname } = useRouter();

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(
    () => setMenuVisible(false),
    [pathname]
  );

  function setLinkAsActive(page: string) {
    return page === pathname ? "navigation active" : "navigation";
  }

  return (
    <Container>
      <Content visible={menuVisible}>
        <Link href="/">
          <h2 className="logo">
            Pote<strong>Cake</strong>
          </h2>
        </Link>

        <nav className={menuVisible && "mobileMenu"}>
          <Link href="/">
            <p className={setLinkAsActive("/")}>Inicio</p>
          </Link>
          <Link href="/products">
            <p className={setLinkAsActive("/products")}>Produtos</p>
          </Link>
          <Link href="/cart">
            <p className={setLinkAsActive("/cart")}>Carrinhos</p>
          </Link>
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