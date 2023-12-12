import {
  type ClipboardEventHandler,
  type KeyboardEventHandler,
  forwardRef,
} from "react";

import Prompt from "./Prompt";
import * as styles from "./Terminal.css";

interface CommandInputProps {
  gitRef: string;
  handleInput: KeyboardEventHandler;
}

const CommandInput = forwardRef<HTMLSpanElement, CommandInputProps>(
  ({ gitRef, handleInput }, ref) => {
    const handlePaste: ClipboardEventHandler = (event) => {
      event.preventDefault();

      const pastedDataPlainText = event.clipboardData.getData("text/plain");
      const range = document.getSelection()?.getRangeAt(0);
      if (!range) {
        return;
      }

      range.deleteContents();

      const textNode = document.createTextNode(pastedDataPlainText);
      const cursorAnchorNode = document.createElement("span");

      range.insertNode(cursorAnchorNode);
      range.insertNode(textNode);
      range.collapse(false);

      cursorAnchorNode.scrollIntoView();
      cursorAnchorNode.remove();
    };

    return (
      <div className={styles.commandInputContainer}>
        <span id="commandLabel" style={{ display: "none" }}>
          Enter git command
        </span>
        <Prompt gitRef={gitRef} />
        <span
          className={styles.commandInput}
          contentEditable
          onKeyDown={handleInput}
          onPaste={handlePaste}
          role="textbox"
          aria-placeholder="git command"
          aria-labelledby="commandLabel"
          tabIndex={0}
          ref={ref}
        />
      </div>
    );
  },
);

CommandInput.displayName = "CommandInput";

export default CommandInput;
