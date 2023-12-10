import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";

import { ENTER_KEY, ESC_KEY } from "../../constants/event";
import { createClassManipulator } from "../../utils/classList";

import * as styles from "./Editor.css";

type ModeType = "insert" | "command";

const ERROR_CLASS_NAME = "error";

export interface EditorProps {
  initialFile: string;
  onSubmit: (file: string) => void;
}

export function Editor({ initialFile, onSubmit }: EditorProps) {
  const [mode, setMode] = useState<ModeType>("command");
  const [inputReadonly, setInputReadonly] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState(initialFile);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const manipulateErrorClass = createClassManipulator(
    inputRef,
    ERROR_CLASS_NAME,
  );

  const toCommandMode = (nextInputValue: string) => {
    manipulateErrorClass("remove");
    setMode("command");
    setInputValue(nextInputValue);
    setInputReadonly(true);
    textareaRef.current?.focus();
  };

  const handleTextareaOnChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const key = (event.nativeEvent as InputEvent).data;
    event.preventDefault();
    if (isCommandMode(mode)) {
      if (key === "i") {
        setMode("insert");
        setInputValue("-- INSERT --");
        event.preventDefault();
        return;
      }
      if (key === ":") {
        setInputValue(key);
        setInputReadonly(false);
        inputRef.current?.focus();
        event.preventDefault();
        return;
      }
    }
    if (isInsertMode(mode)) setTextareaValue(event.target.value);
  };

  const handleTextareaKeyUp: KeyboardEventHandler = (event) => {
    const { key } = event;
    if (isInsertMode(mode)) {
      if (key === ESC_KEY) {
        toCommandMode("");
      }
    }
  };

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const {
      key,
      currentTarget: { value: valueBeforeTrim },
    } = event;
    const value = valueBeforeTrim.trim();
    const currentFile = textareaValue;

    if (key === ESC_KEY) {
      toCommandMode("");
      return;
    }

    if (key === ENTER_KEY) {
      const changedFile = initialFile !== currentFile;

      if (value === ":") {
        toCommandMode(":");
        return;
      }

      if (value === ":q") {
        if (changedFile) {
          event.preventDefault();
          toCommandMode("E37: No write since last change (add ! to override)");
          manipulateErrorClass("add");
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
        onSubmit(currentFile);
        return;
      }

      event.preventDefault();
      toCommandMode(`E492: Not an editor command: ${value.substring(1)}`);
      manipulateErrorClass("add");
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setInputValue(value);
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        value={textareaValue}
        onChange={handleTextareaOnChange}
        onKeyUp={handleTextareaKeyUp}
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
  );
}

function isCommandMode(mode: ModeType) {
  return mode === "command";
}

function isInsertMode(mode: ModeType) {
  return !isCommandMode(mode);
}
