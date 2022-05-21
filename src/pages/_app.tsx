import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import { CartProvider } from "../context/CartContext";
import { makeServer } from "../services/mirage";

import "../styles/global.css";

import 'react-toastify/dist/ReactToastify.css';
import { Header } from "../components/Header";

makeServer();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Header />
      <Component {...pageProps} />
      <ToastContainer/>
    </CartProvider>
  )
}

export default MyApp
