import { type KeyboardEventHandler, forwardRef } from "react";

import { ENTER_KEY } from "../../constants/event";
import type { TerminalContentType } from "../../types/terminalType";

import CommandInput from "./CommandInput";
import * as styles from "./Terminal.css";
import TerminalContent from "./TerminalContent";

interface TerminalProps {
  gitRef: string;
  contentArray: TerminalContentType[];
  onTerminal: (input: string) => void;
}

const Terminal = forwardRef<HTMLSpanElement, TerminalProps>(
  ({ gitRef, contentArray, onTerminal }, ref) => {
    const handleStandardInput: KeyboardEventHandler = async (event) => {
      const {
        key,
        currentTarget,
        nativeEvent: { isComposing },
      } = event;
      if (isComposing || key !== ENTER_KEY) {
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
      <div className={styles.terminalContainer}>
        <TerminalContent contentArray={contentArray} />
        <CommandInput
          gitRef={gitRef}
          handleInput={handleStandardInput}
          ref={ref}
        />
      </div>
    );
  },
);

Terminal.displayName = "Terminal";

export default Terminal;
