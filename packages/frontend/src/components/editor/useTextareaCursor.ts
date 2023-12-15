import {
  FocusEventHandler,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export function useTextareaCursor(textareaRef: RefObject<HTMLTextAreaElement>) {
  const [cursorLast, setCursorLast] = useState(false);
  const cursorRef = useRef({ selectionStart: 0, selectionEnd: 0 });

  const storeCursor = (selectionStart: number, selectionEnd: number) => {
    cursorRef.current = { selectionStart, selectionEnd };
  };

  const restoreCursorRef = useRef(() => {
    const { selectionStart, selectionEnd } = cursorRef.current;
    textareaRef.current?.setSelectionRange(selectionStart, selectionEnd);
  });

  const storeCursorBeforeJumpToLast = (
    selectionStart: number,
    selectionEnd: number,
  ) => {
    storeCursor(selectionStart, selectionEnd);
    setCursorLast(true);
  };

  const handleTextareaBlur: FocusEventHandler<HTMLTextAreaElement> = ({
    target: { selectionStart, selectionEnd },
  }) => {
    storeCursor(selectionStart, selectionEnd);
  };

  const handleTextareaFocus: FocusEventHandler<HTMLTextAreaElement> = () => {
    restoreCursorRef.current();
  };

  useLayoutEffect(() => {
    if (cursorLast) {
      // 마지막으로 이동한 커서 위치 이전으로 복원
      restoreCursorRef.current();
      setCursorLast(false);
    }
  }, [cursorLast, restoreCursorRef]);

  return {
    storeCursor,
    restoreCursorRef,
    storeCursorBeforeJumpToLast,
    handleTextareaBlur,
    handleTextareaFocus,
  };
}
