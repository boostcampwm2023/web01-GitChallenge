import Link from "next/link";
import { useRouter } from "next/router";
import { GrPowerReset } from "react-icons/gr";
import { IoMdCheckmark } from "react-icons/io";

import { sessionAPI } from "../../../../apis/session";
import { BROWSWER_PATH } from "../../../../constants/path";
import {
  UserQuizStatusActionType,
  useUserQuizStatus,
  useUserQuizStatusDispatch,
} from "../../../../contexts/UserQuizStatusContext";
import * as layout from "../../../tokens/layout.css";
import { Accordion } from "../Accordion";
import { toast } from "../Toast";

import GitHelpAccordion from "./GitHelpAccordion";
import { sidebarNavigation } from "./nav";
import * as styles from "./SideBar.css";

export default function SideBar() {
  const userQuizStatusDispatcher = useUserQuizStatusDispatch();

  const handleResetSession = async () => {
    try {
      await sessionAPI.resetSession();
      userQuizStatusDispatcher({
        type: UserQuizStatusActionType.Reset,
      });
      toast.success("문제가 성공적으로 초기화되었습니다!");
    } catch (error) {
      toast.error(
        "문제 초기화 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
  };

  return (
    <div className={layout.sideBar}>
      <nav className={styles.navigation}>
        <GitHelpAccordion />
        {sidebarNavigation.map((item) => (
          <Accordion key={item.title} open>
            <Accordion.Details>
              <Accordion.Summary>{item.title}</Accordion.Summary>
              <SubTitleList subItems={item.subItems} />
            </Accordion.Details>
          </Accordion>
        ))}
      </nav>
      <div>
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleResetSession}
        >
          <GrPowerReset />
          문제 상태 전체 초기화하기
        </button>
      </div>
    </div>
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
