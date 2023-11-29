import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";

import { isString } from "../../utils/typeGuard";

import * as styles from "./Editor.css";

type ModeType = "insert" | "command";

const ARROW = "Arrow";

interface EditorProps {
  initialFile: string;
  onSubmit: (file: string) => void;
}

export function Editor({ initialFile, onSubmit }: EditorProps) {
  const [mode, setMode] = useState<ModeType>("command");
  const [inputReadonly, setInputReadonly] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaKeyDown: KeyboardEventHandler = (event) => {
    const { key } = event;

    if (isCommandMode(mode)) {
      if (key === "i") {
        setMode("insert");
        setInputValue("-- INSERT --");

        event.preventDefault();
        return;
      }

      if (key.startsWith(ARROW)) {
        return;
      }

      if (key === ":") {
        setInputValue(key);
        setInputReadonly(false);
        inputRef.current?.focus();
        event.preventDefault();
        return;
      }

      event.preventDefault();
    }

    if (isInsertMode(mode)) {
      if (key === "Escape") {
        setMode("command");
        setInputValue("");
        setInputReadonly(true);
      }
    }
  };

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const {
      key,
      currentTarget: { value },
    } = event;
    const currentFile = textareaRef.current?.value;

    if (key === "Escape") {
      setMode("command");
      setInputValue("");
      setInputReadonly(true);
      textareaRef.current?.focus();
      return;
    }

    if (key === "Enter") {
      const changedFile = initialFile !== currentFile;

      if (value === ":q") {
        if (changedFile) {
          setInputValue("E37: No write since last change (add ! to override)");
          setInputReadonly(true);
          setMode("command");
          event.preventDefault();

          textareaRef.current?.focus();
          return;
        }

        onSubmit(initialFile);
        return;
      }

      if (value === ":q!") {
        onSubmit(initialFile);
        return;
      }

      if (value === ":wq" || value === ":wq!") {
        if (isString(currentFile)) {
          onSubmit(currentFile);
        }
      }
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
          defaultValue={initialFile}
          ref={textareaRef}
          data-testid="textarea"
        />
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
          ref={inputRef}
          readOnly={inputReadonly}
          data-testid="input"
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
