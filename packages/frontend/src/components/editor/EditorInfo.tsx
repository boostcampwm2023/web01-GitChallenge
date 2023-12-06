import Info from "../../design-system/components/common/Info/Info";

import * as styles from "./Editor.css";

export default function EditorInfo() {
  return (
    <div className={styles.notice}>
      {NOTICE.map((line) => (
        <Info key={line}>{line}</Info>
      ))}
    </div>
  );
}

const NOTICE = [
  '텍스트를 작성하거나 수정하려면 "i"를 눌러 입력 모드로 전환해 주세요.',
  '입력 모드에서 입력한 텍스트를 저장하거나 종료하려면 "ESC" > ":"를 순서대로 누르고 아래 안내사항을 따라주세요.',
  '수정을 완료한 뒤 저장하지 않고 종료하려면 "q" > "Enter"를 순서대로 눌러주세요.',
  '수정을 완료한 뒤 저장하고 종료하려면 "wq" > "Enter"를 순서대로 눌러주세요.',
  '종료/저장 전 다시 입력 모드로 전환하고 싶다면 "ESC" > "i"를 순서대로 눌러주세요.',
];
