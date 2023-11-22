import { ReactElement } from "react";

import * as layout from "../../../tokens/layout.css";
import { Footer, Header, SideBar } from "../index";

interface LayoutProps {
  children: ReactElement;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className={layout.base}>
        <SideBar />
        <div className={layout.container}>{children}</div>
      </div>
      <Footer />
    </>
  );
}
