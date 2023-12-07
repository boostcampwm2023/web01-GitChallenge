import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";

import { ESC_KEY } from "../../../../constants/event";
import { preventBubbling } from "../../../../utils/event";
import IconButton from "../IconButton/IconButton";

import * as styles from "./Modal.css";

export interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const setScrollLock = (isLock: boolean) => {
  document.body.style.overflow = isLock ? "hidden" : "auto";
};

export default function Modal({ onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const escKeyCloseEvent = (event: KeyboardEvent) => {
      if (event.key === ESC_KEY) {
        onClose();
      }
    };
    setScrollLock(true);
    window.addEventListener("keydown", escKeyCloseEvent);
    return () => {
      window.removeEventListener("keydown", escKeyCloseEvent);
      setScrollLock(false);
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="button"
      tabIndex={0}
      onKeyDown={preventBubbling}
    >
      <div
        className={styles.container}
        onClick={preventBubbling}
        role="button"
        tabIndex={0}
        onKeyDown={preventBubbling}
      >
        <IconButton className={styles.close} onClick={onClose}>
          <IoCloseOutline />
        </IconButton>
        {children}
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement,
  );
}
