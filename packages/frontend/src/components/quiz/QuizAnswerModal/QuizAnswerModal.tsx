import { FaInfoCircle } from "react-icons/fa";

import { Modal } from "../../../design-system/components/common";
import { toCodeTag } from "../../../utils/mapper";

import * as styles from "./QuizAnswerModal.css";

interface QuizModalProps {
  answer: string[];
  closeModal: () => void;
}

export default function QuizAnswerModal({
  answer,
  closeModal,
}: QuizModalProps) {
  return (
    <Modal onClose={closeModal}>
      <div className={styles.title}>모범 답안</div>
      <p
        className={styles.answerContainer}
        dangerouslySetInnerHTML={{
          __html: toCodeTag(answer.join("\n")),
        }}
      />
      <div className={styles.answerNotice}>
        <FaInfoCircle />본 답안은 모범 답안으로 제공되었으며, 상황에 따라 다양한
        해결책이 있을 수 있습니다.
      </div>
    </Modal>
  );
}
