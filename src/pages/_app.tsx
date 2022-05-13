import { AppProps } from "next/app";
import { CartProvider } from "../context/CartContext";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
