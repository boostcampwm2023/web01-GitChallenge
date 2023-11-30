import { type KeyboardEventHandler, forwardRef } from "react";

import { ENTER_KEY } from "../../constants/event";
import type { TerminalContentType } from "../../types/terminalType";

import CommandInput from "./CommandInput";
import * as styles from "./Terminal.css";
import TerminalContent from "./TerminalContent";

interface TerminalProps {
  contentArray: TerminalContentType[];
  onTerminal: (input: string) => void;
}

const Terminal = forwardRef<HTMLSpanElement, TerminalProps>(
  ({ contentArray, onTerminal }, ref) => {
    const handleStandardInput: KeyboardEventHandler = async (event) => {
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
    };

    return (
      <div className={styles.container}>
        <div className={styles.hr} />
        <div className={styles.terminalContainer}>
          <TerminalContent contentArray={contentArray} />

          <CommandInput handleInput={handleStandardInput} ref={ref} />
        </div>
      </div>
    );
  },
);

Terminal.displayName = "Terminal";

export default Terminal;
