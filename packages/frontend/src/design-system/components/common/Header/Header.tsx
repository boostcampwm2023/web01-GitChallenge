import Image from "next/image";
import Link from "next/link";

import { ColorTheme } from "../../../../hooks/useTheme";
import classnames from "../../../../utils/classnames";
import { header as headerLayout } from "../../../tokens/layout.css";
import { useThemeContext } from "../Theme/ThemeContext";
import ThemeSelect from "../Theme/ThemeSelect";

import * as styles from "./Header.css";

export default function Header() {
  const headerStyle = classnames(styles.borderBottom, headerLayout);
  const { colorTheme } = useThemeContext();

  const imgMap = {
    light: "/light-logo.svg",
    dark: "/dark-logo.svg",
  }[colorTheme as ColorTheme];

  return (
    <header className={headerStyle}>
      <div className={styles.container}>
        <h1>
          <Link href="/">
            <Image src={imgMap} alt="Git Challenge" width={238} height={30} />
          </Link>
        </h1>
        <ThemeSelect />
      </div>
    </header>
  );
}
