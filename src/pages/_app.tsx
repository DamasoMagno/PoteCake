import { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";

import { CartProvider } from "@contexts/CartContext";
import { client } from "@libs/apollo";

import { Header } from "@components/Header";

import "@styles/global.scss";

import 'react-toastify/dist/ReactToastify.css';

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
