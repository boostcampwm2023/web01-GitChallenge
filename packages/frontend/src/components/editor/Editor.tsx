import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";

import * as styles from "./Editor.css";

type ModeType = "insert" | "command";

export function Editor() {
  const [mode, setMode] = useState<ModeType>("command");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputReadonly, setInputReadonly] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const handleTextareaKeyDown: KeyboardEventHandler = (event) => {
    const { key } = event;

    if (isCommandMode(mode)) {
      if (key === "i") {
        setMode("insert");
        setInputValue("-- INSERT --");
        event.preventDefault();
        return;
      }
    }

    if (isInsertMode(mode) && key === "Escape") {
      setMode("command");
      setInputValue("");
      setInputReadonly(true);
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setInputValue(value);
  };

  return (
    <>
      <span>{isCommandMode(mode) ? "명령모드" : "입력모드"}</span>
      <div className={styles.container}>
        <textarea
          className={styles.textarea}
          onKeyDown={handleTextareaKeyDown}
        />
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

function isCommandMode(mode: ModeType) {
  return mode === "command";
}

function isInsertMode(mode: ModeType) {
  return !isCommandMode(mode);
}
