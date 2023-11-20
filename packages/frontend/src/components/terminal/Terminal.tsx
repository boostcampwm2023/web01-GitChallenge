import {
  type KeyboardEventHandler,
  RefObject,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import classnames from "../../utils/classnames";

import * as styles from "./Terminal.css";

type TerminalContentType =
  | STDINContentType
  | STDOUTContentType
  | STDERRContentType;

type STDContentType<T> = { type: T; content: string };
type STDINContentType = STDContentType<"stdin">;
type STDOUTContentType = STDContentType<"stdout">;
type STDERRContentType = STDContentType<"stderr">;

interface TerminalProps {
  contentArray: TerminalContentType[];
  onStandardInput: (input: string) => void;
}

export default function Terminal({
  contentArray,
  onStandardInput,
}: TerminalProps) {
  const commandInputRef = useRef<HTMLSpanElement>(null);

  const handleSTDIN: KeyboardEventHandler = (event) => {
    const { key, currentTarget } = event;
    if (key !== "Enter") {
      return;
    }

    const value = (currentTarget.textContent ?? "").trim();
    if (!value) {
      event.preventDefault();
      return;
    }

    onStandardInput(value);

    currentTarget.textContent = "";
    event.preventDefault();
  };

  const terminalContent = contentArray.map(toTerminalContentComponent);

  useEffect(() => {
    scrollIntoView(commandInputRef);
  }, [contentArray]);

  return (
    <div className={styles.container}>
      <div className={styles.hr} />
      <div className={styles.terminalContainer}>
        <div>{terminalContent}</div>
        <CommandInput handleInput={handleSTDIN} ref={commandInputRef} />
      </div>
    </div>
  );
}

const contentMap = {
  stdin: StdInContent,
  stdout: StdOutContent,
  stderr: StdErrContent,
};

function Prompt() {
  return <span className={styles.prompt}>$</span>;
}

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

interface CommandInputProps {
  handleInput: KeyboardEventHandler;
}

const CommandInput = forwardRef<HTMLSpanElement, CommandInputProps>(
  ({ handleInput }, ref) => (
    <div className={styles.commandInputContainer}>
      <span id="commandLabel" style={{ display: "none" }}>
        Enter git command
      </span>
      <Prompt />
      <span
        className={classnames(styles.commandInput, styles.stdin)}
        contentEditable
        onKeyDown={handleInput}
        role="textbox"
        aria-placeholder="git command"
        aria-labelledby="commandLabel"
        tabIndex={0}
        ref={ref}
      />
    </div>
  ),
);

CommandInput.displayName = "CommandInput";

function scrollIntoView<T extends Element>(ref: RefObject<T>) {
  const $element = ref.current;
  if (!$element) {
    return;
  }

  $element.scrollIntoView();
}

function toTerminalContentComponent(
  { type, content }: TerminalContentType,
  index: number,
) {
  const Content = contentMap[type];
  return <Content key={[type, index].join("-")} content={content} />;
}
