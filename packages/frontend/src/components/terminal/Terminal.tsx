import { type KeyboardEventHandler, useEffect, useRef } from "react";

import { ENTER_KEY } from "../../constants/event";
import type { TerminalContentType } from "../../types/terminalType";
import { scrollIntoView } from "../../utils/scroll";

import CommandInput from "./CommandInput";
import * as styles from "./Terminal.css";
import TerminalContent from "./TerminalContent";

interface TerminalProps {
  contentArray: TerminalContentType[];
  onTerminal: (input: string) => void;
}

export default function Terminal({ contentArray, onTerminal }: TerminalProps) {
  const inputRef = useRef<HTMLSpanElement>(null);

  const handleStandardInput: KeyboardEventHandler = (event) => {
    const { key, currentTarget } = event;
    if (key !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const value = (currentTarget.textContent ?? "").trim();
    if (!value) {
      return;
    }

    onTerminal(value);

    currentTarget.textContent = "";
  };

  useEffect(() => {
    scrollIntoView(inputRef);
  }, [contentArray]);

  return (
    <div className={styles.container}>
      <div className={styles.hr} />
      <div className={styles.terminalContainer}>
        <TerminalContent contentArray={contentArray} />

        <CommandInput handleInput={handleStandardInput} ref={inputRef} />
      </div>
    </div>
  );
}
