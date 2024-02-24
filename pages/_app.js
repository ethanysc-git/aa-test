import "@/styles/globals.css";

import Head from "next/head";
import Header from "../components/Header";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Dragon Mint</title>
        <meta name="description" content="Generated with create-pinata-app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/2024 year of the dragon.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
