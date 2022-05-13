import { Head, Html, Main, NextScript } from "next/document";

export default function MyDocument() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />

        <meta name="description" content="Nossa plataforma de venda de doces" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}