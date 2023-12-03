import { useRouter } from "next/router";

import { Button, Modal } from "../../../design-system/components/common";

import * as styles from "./SolvedModal.css";

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
  const router = useRouter();
  const handleShowAnswer = () => {
    router.push(link);
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h3 className={styles.title}>정답입니다 🥳</h3>
        <strong className={styles.strong}>내 답안을 공유해볼까요?</strong>
        <div className={styles.linkContainer}>
          <input
            className={styles.linkInput}
            type="text"
            defaultValue={link}
            readOnly
          />
          <button type="button" className={styles.linkCopyButton}>
            URL 복사
          </button>
        </div>
        <div className={styles.buttonGroup}>
          <Button full variant="primaryLow" onClick={handleShowAnswer}>
            내 답안 보러가기
          </Button>
          {!lastQuiz ? (
            <Button full variant="primaryFill" onClick={onNextQuiz}>
              다음 문제 풀래요
            </Button>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
