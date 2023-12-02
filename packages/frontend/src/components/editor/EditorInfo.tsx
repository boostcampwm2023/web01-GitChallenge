import { FaInfoCircle } from "react-icons/fa";

import * as styles from "./Editor.css";

export default function EditorInfo() {
  return (
    <div className={styles.notice}>
      {[
        `명령 모드에서 입력 모드로 전환하려면 "i"를 눌러주세요.`,
        `입력 모드에서 마지막 라인 모드로 전환하려면 ":"을 눌러주세요.`,
        `마지막 라인 모드와 입력 모드에서 명령모드로 전환하려면 "ESC"를 눌러주세요.`,
        `마지막 라인 모드에서는 "q", "q!", "wq", "wq!" 명령어만 지원합니다.`,
      ].map((line) => (
        <div key={line} className={styles.noticeItem}>
          <FaInfoCircle />
          {line}
        </div>
      ))}
    </div>
  );
}
