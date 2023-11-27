import Image from "next/image";
import Link from "next/link";

import classnames from "../../../../utils/classnames";
import { header as headerLayout } from "../../../tokens/layout.css";

import * as styles from "./Header.css";

export default function Header() {
  const headerStyle = classnames(styles.borderBottom, headerLayout);
  const logoSrc = "/light-logo.svg";

  return (
    <header className={headerStyle}>
      <div className={styles.container}>
        <h1>
          <Link href="/">
            <Image
              src={logoSrc}
              alt="git-challenge-logo"
              width={238}
              height={30}
            />
          </Link>
        </h1>
      </div>
    </header>
  );
}
