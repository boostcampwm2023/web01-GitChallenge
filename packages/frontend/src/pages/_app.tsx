import "../styles/global.css";

import type { AppProps } from "next/app";
import React from "react";

import { ToastContainer } from "../components/common";

import "react-toastify/dist/ReactToastify.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <React.StrictMode>
        <Component {...pageProps} />
      </React.StrictMode>
      <ToastContainer />
    </>
  );
}
