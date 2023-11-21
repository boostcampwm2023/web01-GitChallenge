import { type KeyboardEventHandler, RefObject, useEffect, useRef } from "react";

import CommandInput from "./CommandInput";
import * as styles from "./Terminal.css";
import TerminalContent from "./TerminalContent";

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

  useEffect(() => {
    scrollIntoView(commandInputRef);
  }, [contentArray]);

  return (
    <div className={styles.container}>
      <div className={styles.hr} />
      <div className={styles.terminalContainer}>
        <TerminalContent contentArray={contentArray} />

        <CommandInput handleInput={handleSTDIN} ref={commandInputRef} />
      </div>
    </div>
  );
}

function scrollIntoView<T extends Element>(ref: RefObject<T>) {
  const $element = ref.current;
  if (!$element) {
    return;
  }

  $element.scrollIntoView();
}
