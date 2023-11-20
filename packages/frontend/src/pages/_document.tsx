import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="light" lang="en">
      <Head />
      <body>
        <div id="modal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
