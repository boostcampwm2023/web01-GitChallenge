import "../design-system/styles/global.css";

import type { AppProps } from "next/app";
import React from "react";

import "react-toastify/dist/ReactToastify.min.css";

import { ToastContainer } from "../design-system/components/common";
import Layout from "../design-system/components/common/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <React.StrictMode>
        <Layout>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Layout>
      </React.StrictMode>
      <ToastContainer />
    </>
  );
}
