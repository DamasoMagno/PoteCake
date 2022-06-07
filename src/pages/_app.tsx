import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";

import { CartProvider } from "../context/CartContext";

import { Header } from "../components/Header";

import "../styles/global.scss";

import 'react-toastify/dist/ReactToastify.css';

import { client } from "../libs/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Header />
        <Component {...pageProps} />

        <ToastContainer />
      </CartProvider>
    </ApolloProvider>
  )
}

export default MyApp
