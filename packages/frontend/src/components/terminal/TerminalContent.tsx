import Prompt from "./Prompt";
import * as styles from "./Terminal.css";

interface TerminalContentProps {
  contentArray: TerminalContentType[];
}

type TerminalContentType =
  | STDINContentType
  | STDOUTContentType
  | STDERRContentType;

type STDContentType<T> = { type: T; content: string };
type STDINContentType = STDContentType<"stdin">;
type STDOUTContentType = STDContentType<"stdout">;
type STDERRContentType = STDContentType<"stderr">;

export default function TerminalContent({
  contentArray,
}: TerminalContentProps) {
  const content = contentArray.map(toTerminalContentComponent);
  return <div>{content}</div>;
}

const contentMap = {
  stdin: StdInContent,
  stdout: StdOutContent,
  stderr: StdErrContent,
};

function StdInContent({ content }: Pick<STDINContentType, "content">) {
  return (
    <div className={styles.stdinContainer}>
      <Prompt />
      <span className={styles.stdin}>{content}</span>
    </div>
  );
}

function StdOutContent({ content }: Pick<STDOUTContentType, "content">) {
  return (
    <div>
      <span>{content}</span>
    </div>
  );
}

function StdErrContent({ content }: Pick<STDERRContentType, "content">) {
  return (
    <div className={styles.stdinContainer}>
      <Prompt />
      <span className={styles.stdin}>{content}</span>
    </div>
  );
}

function toTerminalContentComponent(
  { type, content }: TerminalContentType,
  index: number
) {
  const Content = contentMap[type];
  return <Content key={[type, index].join("-")} content={content} />;
}
