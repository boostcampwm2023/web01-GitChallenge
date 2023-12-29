import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { BROWSWER_PATH } from "../../../../constants/path";
import { useQuizCoachActionContext } from "../../../../contexts/QuizCoachContext";
import { ColorTheme } from "../../../../hooks/useTheme";
import classnames from "../../../../utils/classnames";
import { header as headerLayout } from "../../../tokens/layout.css";
import { useThemeContext } from "../Theme/ThemeContext";
import ThemeSelect from "../Theme/ThemeSelect";

import * as styles from "./Header.css";

export default function Header() {
  const headerStyle = classnames(styles.borderBottom, headerLayout);
  const { colorTheme } = useThemeContext();

  const router = useRouter();
  const { handleStart } = useQuizCoachActionContext();
  const quizPage = router.pathname.startsWith(`${BROWSWER_PATH.QUIZZES}/`);

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
        <div className={styles.actionGroup}>
          {quizPage && (
            <button
              type="button"
              onClick={handleStart}
              className={styles.tutorialButton}
            >
              튜토리얼
            </button>
          )}
          <ThemeSelect />
        </div>
      </div>
    </header>
  );
}
