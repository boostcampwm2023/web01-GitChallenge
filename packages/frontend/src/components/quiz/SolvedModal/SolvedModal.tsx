import { useRef } from "react";

import {
  Button,
  LinkButton,
  Modal,
  toast,
} from "../../../design-system/components/common";
import { createClassManipulator } from "../../../utils/classList";

import * as styles from "./SolvedModal.css";

const VISIBLE = "visible";

const COPY_SUCCESS_DURATION = 1000;

interface SolvedModalProps {
  link: string;
  lastQuiz: boolean;
  onClose: () => void;
  onNextQuiz: () => void;
}

export function SolvedModal({
  link,
  lastQuiz,
  onClose,
  onNextQuiz,
}: SolvedModalProps) {
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const manipulateVisibleClass = createClassManipulator(copyButtonRef, VISIBLE);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      manipulateVisibleClass("add");

      setTimeout(() => {
        manipulateVisibleClass("remove");
      }, COPY_SUCCESS_DURATION);
    } catch (error) {
      toast.error("링크 복사를 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h3 className={styles.title}>정답입니다 🥳</h3>
        <span className={styles.strong}>내 답안을 공유해볼까요?</span>
        <div className={styles.linkContainer}>
          <input
            className={styles.linkInput}
            type="text"
            defaultValue={link}
            readOnly
          />
          <button
            type="button"
            className={styles.linkCopyButton}
            onClick={handleCopy}
            ref={copyButtonRef}
          >
            <span className={styles.linkCopyButtonText}>URL 복사</span>
          </button>
        </div>
        <div className={styles.buttonGroup}>
          <LinkButton full variant="primaryLow" path={link}>
            내 답안 보러가기
          </LinkButton>
          {!lastQuiz && (
            <Button full variant="primaryFill" onClick={onNextQuiz}>
              다음 문제 풀래요
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
