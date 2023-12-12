import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";

import { ENTER_KEY, ESC_KEY } from "../../constants/event";
import { createClassManipulator } from "../../utils/classList";
import { focusRef } from "../../utils/refObject";

import * as styles from "./Editor.css";
import { useTextareaCursor } from "./useTextareaCursor";

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

  const {
    storeCursor,
    restoreCursorRef,
    storeCursorBeforeJumpToLast,
    handleTextareaBlur,
    handleTextareaFocus,
  } = useTextareaCursor(textareaRef);

  const manipulateErrorClass = createClassManipulator(
    inputRef,
    ERROR_CLASS_NAME,
  );

  const toCommandMode = (nextInputValue: string) => {
    manipulateErrorClass("remove");
    setMode("command");
    setInputValue(nextInputValue);
    setInputReadonly(true);
    focusRef(textareaRef);
  };

  const handleTextareaOnChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const {
      target: { value, selectionStart, selectionEnd },
    } = event;

    const key = (event.nativeEvent as InputEvent).data;
    event.preventDefault();

    if (isCommandMode(mode)) {
      const keyOffset = key?.length ?? 0;
      const selectionStartBeforeKeyAdded = selectionStart - keyOffset;
      const selectionEndBeforeKeyAdded = selectionEnd - keyOffset;

      if (key === ":") {
        // textarea가 blur되기 전에 key가 입력되기 전의 커서 위치를 저장하고 복원해야 함
        storeCursor(selectionStartBeforeKeyAdded, selectionEndBeforeKeyAdded);
        restoreCursorRef.current();

        setInputValue(key);
        setInputReadonly(false);
        focusRef(inputRef);
        return;
      }

      storeCursorBeforeJumpToLast(
        selectionStartBeforeKeyAdded,
        selectionEndBeforeKeyAdded,
      );

      if (key === "i") {
        setMode("insert");
        setInputValue("-- INSERT --");
        return;
      }
    }
    if (isInsertMode(mode)) setTextareaValue(value);
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
        onFocus={handleTextareaFocus}
        onBlur={handleTextareaBlur}
        ref={textareaRef}
        data-testid="textarea"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
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
