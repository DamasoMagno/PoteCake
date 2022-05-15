import { AppProps } from "next/app";

import { CartProvider } from "../context/CartContext";
import { makeServer } from "../services/mirage";

import "../styles/global.css";

makeServer();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
