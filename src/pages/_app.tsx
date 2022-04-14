import { AppProps } from "next/app";

import { Header } from "../components/Header";

import { GlobalStyles } from "../styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  )
}

export default MyApp
