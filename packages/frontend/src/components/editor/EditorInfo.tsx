import { FaInfoCircle } from "react-icons/fa";

import * as styles from "./Editor.css";

export default function EditorInfo() {
  return (
    <div className={styles.notice}>
      {NOTICE.map((line) => (
        <div key={line} className={styles.noticeItem}>
          <FaInfoCircle />
          {line}
        </div>
      ))}
    </div>
  );
}

const NOTICE = [
  '텍스트를 작성하거나 수정하려면 "i"를 눌러 입력 모드로 전환해 주세요.',
  '입력 모드에서 입력한 텍스트를 저장하거나 종료하려면 "ESC"와 ":"를 눌러 마지막 라인 모드로 전환해 주세요.',
  `마지막 라인 모드에서 텍스트를 저장하지 않고 종료하려면 "q"와 "Enter"를 눌러주세요.`,
  `마지막 라인 모드에서 텍스트를 저장하고 종료하려면 "wq"와 "Enter"를 눌러주세요.`,
  '마지막 라인 모드에서 다시 입력 모드로 전환하고 싶다면 "ESC"와 "i"를 눌러주세요.',
];
