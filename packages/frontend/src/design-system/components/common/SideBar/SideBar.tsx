import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdCheckmark } from "react-icons/io";

import { BROWSWER_PATH } from "../../../../constants/path";
import { useUserQuizStatus } from "../../../../contexts/UserQuizStatusContext";
import * as layout from "../../../tokens/layout.css";
import { Accordion } from "../Accordion";

import GitHelpAccordian from "./GitHelpAccordian";
import { sidebarNavigation } from "./nav";
import * as styles from "./SideBar.css";

export default function SideBar() {
  return (
    <nav className={layout.sideBar}>
      <GitHelpAccordian />
      {sidebarNavigation.map((item) => (
        <Accordion key={item.title} open>
          <Accordion.Details>
            <Accordion.Summary>{item.title}</Accordion.Summary>
            <SubItems subItems={item.subItems} />
          </Accordion.Details>
        </Accordion>
      ))}
    </nav>
  );
}

interface SubItemsProps {
  id?: number;
  subTitle: string;
}

function SubItems({ subItems }: { subItems: SubItemsProps[] }) {
  const {
    query: { id },
  } = useRouter();
  const userQuizStatus = useUserQuizStatus();

  const idNum = id ? +id : 0;

  return (
    <ol className={styles.linkContainerStyle}>
      {subItems.map((subTitle) => (
        <li
          className={styles.linkItemStyle}
          key={[subTitle.subTitle, subTitle?.id].join("")}
        >
          <Link
            href={`${BROWSWER_PATH.QUIZZES}/${subTitle.id}`}
            className={
              idNum === subTitle.id ? styles.currentLinkStyle : styles.linkStyle
            }
          >
            {subTitle.subTitle}
            {userQuizStatus[subTitle.id ?? ""] && (
              <IoMdCheckmark className={styles.checkIcon} size={14} />
            )}
          </Link>
        </li>
      ))}
    </ol>
  );
}
