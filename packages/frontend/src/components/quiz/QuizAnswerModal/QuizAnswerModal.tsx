import {
  CodeBlock,
  Info,
  Modal,
} from "../../../design-system/components/common";
import typography from "../../../design-system/tokens/typography";

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
      <h3 className={styles.h3}>모범 답안</h3>
      <CodeBlock code={answer} className={typography.$semantic.body2Regular} />
      <Info>
        본 답안은 모범 답안으로 제공되었으며, 상황에 따라 다양한 해결책이 있을
        수 있습니다.
      </Info>
    </Modal>
  );
}
