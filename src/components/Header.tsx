import Link from "next/link";

export function Header() {
  return (
    <header className="w-full">
      <nav className="flex items-center gap-4 w-10/12 justify-end mx-auto py-4">
        <Link href="/">
          <li className="list-none text-white text-2xl cursor-pointer">
            Inicio
          </li>
        </Link>
        <Link href="/menu">
          <li className="list-none text-white text-2xl cursor-pointer">
            Menu
          </li>
        </Link>
        <Link href="/cart">
          <li className="list-none text-white text-2xl cursor-pointer">
            Carrinho
          </li>
        </Link>
      </nav>
    </header>
  );
}