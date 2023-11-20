import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";

import { Header } from "../design-system/components/common";

import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Header />;
}
