import Link from "next/link";
import { useRouter } from "next/router";

import { BROWSWER_PATH } from "../../../../constants/path";
import { Accordion } from "../Accordion";

import { gitHelpNavigation } from "./nav";
import * as styles from "./SideBar.css";

export default function GitHelpAccordion() {
  const { pathname } = useRouter();
  const current = pathname === BROWSWER_PATH.MAIN;
  return (
    <Accordion open>
      <Accordion.Details>
        <Accordion.Summary>{gitHelpNavigation.title}</Accordion.Summary>
        <div className={styles.linkContainerStyle}>
          <div className={styles.linkItemStyle}>
            <Link
              href={BROWSWER_PATH.MAIN}
              className={current ? styles.currentLinkStyle : styles.linkStyle}
            >
              {gitHelpNavigation.subTitle}
            </Link>
          </div>
        </div>
      </Accordion.Details>
    </Accordion>
  );
}
