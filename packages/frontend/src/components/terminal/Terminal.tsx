import { type KeyboardEventHandler, forwardRef } from "react";

import { ENTER_KEY } from "../../constants/event";
import type { TerminalContentType } from "../../types/terminalType";
import classnames from "../../utils/classnames";

import CommandInput, { CommandInputForwardRefType } from "./CommandInput";
import * as styles from "./Terminal.css";
import TerminalContent from "./TerminalContent";

interface TerminalProps {
  gitRef: string;
  contentArray: TerminalContentType[];
  className?: string;
  onTerminal: (input: string) => void;
}

const Terminal = forwardRef<CommandInputForwardRefType, TerminalProps>(
  ({ gitRef, contentArray, className = "", onTerminal }, ref) => {
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
      <div className={classnames(styles.terminalContainer, className)}>
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
