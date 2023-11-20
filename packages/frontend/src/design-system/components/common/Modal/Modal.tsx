import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";

import useModal from "../../../../hooks/useModal";
import { preventBubbling } from "../../../../utils/event";
import IconButton from "../IconButton/IconButton";

import * as styles from "./Modal.css";

export interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useModal({ onClose });

  if (!mounted) return null;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="button"
      tabIndex={0}
      aria-hidden="true"
    >
      <div
        className={styles.container}
        onClick={preventBubbling}
        role="button"
        tabIndex={0}
        aria-hidden="true"
      >
        <div className={styles.buttonContainer}>
          <IconButton className={styles.close} onClick={onClose}>
            <IoCloseOutline />
          </IconButton>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement,
  );
}
