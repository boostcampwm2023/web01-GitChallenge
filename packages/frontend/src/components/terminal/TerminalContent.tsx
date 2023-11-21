import type { TerminalContentType } from "../../types/terminalType";

import Prompt from "./Prompt";
import * as styles from "./Terminal.css";

interface TerminalContentProps {
  contentArray: TerminalContentType[];
}

export default function TerminalContent({
  contentArray,
}: TerminalContentProps) {
  const content = contentArray.map(toTerminalContentComponent);
  return <div>{content}</div>;
}

const contentMap = {
  stdin: StandardInputContent,
  stdout: StandardOutputContent,
};

interface ContentProps {
  content: string;
}

function StandardInputContent({ content }: ContentProps) {
  return (
    <div className={styles.stdinContainer}>
      <Prompt />
      <span className={styles.stdin}>{content}</span>
    </div>
  );
}

function StandardOutputContent({ content }: ContentProps) {
  return (
    <div>
      <span>{content}</span>
    </div>
  );
}

function toTerminalContentComponent(
  { type, content }: TerminalContentType,
  index: number,
) {
  const Content = contentMap[type];
  return <Content key={[type, index].join("-")} content={content} />;
}
