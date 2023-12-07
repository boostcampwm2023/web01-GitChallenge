import "../design-system/styles/global.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

import "react-toastify/dist/ReactToastify.min.css";

import { ToastContainer } from "../design-system/components/common";
import Layout from "../design-system/components/common/Layout";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  import("../mocks");
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <React.StrictMode>
        <Head>
          <title>Git Challenge</title>
          <meta
            name="description"
            content="Git Challenge는 Git에 대한 문제를 실제 상황처럼 구현된 환경에서 학습할 수 있는 서비스입니다. 실제 프로젝트나 시나리오에서 발생할 수 있는 다양한 상황들을 경험하고 실전에서 해결할 수 있도록 도움을 드리는 것을 목표로 하고 있습니다."
          />
        </Head>
        <Layout>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Layout>
      </React.StrictMode>
      <ToastContainer />
    </>
  );
}
