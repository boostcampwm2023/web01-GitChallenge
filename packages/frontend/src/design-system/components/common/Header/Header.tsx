import Link from "next/link";

import classnames from "../../../../utils/classnames";
import { header as headerLayout } from "../../../tokens/layout.css";

import * as styles from "./Header.css";

export default function Header() {
  const headerStyle = classnames(styles.borderBottom, headerLayout);
  return (
    <header className={headerStyle}>
      <div className={styles.container}>
        <h1>
          <Link href="/">
            <img src="logo.svg" alt="git-challenge-logo" />
          </Link>
        </h1>
      </div>
    </header>
  );
}
