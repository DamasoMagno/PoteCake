import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import { CartProvider } from "../context/CartContext";
import { Header } from "../components/Header";

import "../styles/global.scss";

import 'react-toastify/dist/ReactToastify.css';
import { makeServer } from "../services/mirage";

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
