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
            <SubTitleList subItems={item.subItems} />
          </Accordion.Details>
        </Accordion>
      ))}
    </nav>
  );
}

interface SubTitleListProps {
  subItems: {
    id: number;
    subTitle: string;
  }[];
}

function SubTitleList({ subItems }: SubTitleListProps) {
  const {
    query: { id },
  } = useRouter();
  const userQuizStatus = useUserQuizStatus();

  const idNum = id ? +id : 0;

  return (
    <ol className={styles.linkContainerStyle}>
      {subItems.map(({ subTitle, id: subItemId }) => (
        <SubTitleItem
          key={subItemId}
          subTitle={subTitle}
          id={subItemId ?? 0}
          current={idNum === subItemId}
          solved={userQuizStatus[subItemId ?? 0] ?? false}
        />
      ))}
    </ol>
  );
}

interface SubTitleItemProps {
  id: number;
  subTitle: string;
  current: boolean;
  solved: boolean;
}

function SubTitleItem({ subTitle, id, current, solved }: SubTitleItemProps) {
  return (
    <li className={styles.linkItemStyle} key={[subTitle, id].join("")}>
      <Link
        href={`${BROWSWER_PATH.QUIZZES}/${id}`}
        className={current ? styles.currentLinkStyle : styles.linkStyle}
      >
        {subTitle}
        {solved && <IoMdCheckmark className={styles.checkIcon} size={14} />}
      </Link>
    </li>
  );
}
