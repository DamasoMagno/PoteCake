import { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";

import { CartProvider } from "@contexts/CartContext";
import { client } from "@libs/apollo";

import { Header } from "@components/Header";

import "@styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Header />

        <Component {...pageProps} />

        <Toaster />
      </CartProvider>
    </ApolloProvider>
  )
}

export default MyApp
