import { useEffect } from "react";

import { ESC_KEY_CODE } from "../constants";

export default function useModal({ onClose }: { onClose: () => void }) {
  const escKeyCloseEvent = (event: KeyboardEvent) => {
    if (event.key === ESC_KEY_CODE) {
      onClose();
    }
  };

  useEffect(() => {
    setScrollLock(true);
    window.addEventListener("keydown", escKeyCloseEvent);
    return () => {
      window.removeEventListener("keydown", escKeyCloseEvent);
      setScrollLock(false);
    };
  }, []);

  const setScrollLock = (isLock: boolean) => {
    document.body.style.overflow = isLock ? "hidden" : "auto";
  };
}
