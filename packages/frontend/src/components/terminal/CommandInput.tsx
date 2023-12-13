import {
  type ClipboardEventHandler,
  type KeyboardEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import { focusRef, scrollIntoViewRef } from "../../utils/refObject";

import Prompt from "./Prompt";
import * as styles from "./Terminal.css";

interface CommandInputProps {
  gitRef: string;
  handleInput: KeyboardEventHandler;
}

export type CommandInputForwardRefType = {
  focus: HTMLSpanElement["focus"];
  scrollIntoView: HTMLSpanElement["scrollIntoView"];
  clear: () => void;
};

const CommandInput = forwardRef<CommandInputForwardRefType, CommandInputProps>(
  ({ gitRef, handleInput }, ref) => {
    const inputRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        focus(options) {
          focusRef(inputRef, options);
        },
        scrollIntoView(arg) {
          scrollIntoViewRef(inputRef, arg);
        },
        clear() {
          const $element = inputRef.current;
          if (!$element) {
            return;
          }

          $element.textContent = "";
        },
      }),
      [],
    );

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

    const handleClick = () => {
      focusRef(inputRef);
    };

    return (
      <div
        className={styles.commandInputContainer}
        onClick={handleClick}
        aria-hidden
      >
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
          ref={inputRef}
        />
      </div>
    );
  },
);

CommandInput.displayName = "CommandInput";

export default CommandInput;
