import { type KeyboardEventHandler, forwardRef } from "react";

import classnames from "../../utils/classnames";

import Prompt from "./Prompt";
import * as styles from "./Terminal.css";

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
  )
);

CommandInput.displayName = "CommandInput";

export default CommandInput;
