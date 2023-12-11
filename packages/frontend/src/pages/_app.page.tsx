import "../design-system/styles/global.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.min.css";

import { sessionAPI } from "../apis/session";
import { UserQuizStatusProvider } from "../contexts/UserQuizStatusContext";
import { ToastContainer, toast } from "../design-system/components/common";
import Layout from "../design-system/components/common/Layout";
import ThemeWrapper from "../design-system/components/common/Theme/ThemeWrapper";
import { UserQuizStatus } from "../types/user";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  import("../mocks");
}

export default function App({ Component, pageProps }: AppProps) {
  const [userQuizStatus, setUserQuizStatus] = useState<UserQuizStatus>({});

  useEffect(() => {
    (async () => {
      try {
        const nextUserQuizStatus = await sessionAPI.getSolved();
        setUserQuizStatus(nextUserQuizStatus);
      } catch (error) {
        toast.error("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요");
      }
    })();
  }, []);

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
        <UserQuizStatusProvider initialUserQuizStatus={userQuizStatus}>
          <ThemeWrapper>
            <Layout>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Component {...pageProps} />
            </Layout>
          </ThemeWrapper>
        </UserQuizStatusProvider>
      </React.StrictMode>
      <ToastContainer />
    </>
  );
}
