import { Button } from "../../../design-system/components/common";
import useModal from "../../../hooks/useModal";
import { Quiz } from "../../../types/quiz";
import CommandAccordion from "../CommandAccordion";
import QuizAnswerModal from "../QuizAnswerModal";
import QuizContent from "../QuizContent";

import * as styles from "./QuizGuide.css";

interface QuizGuideProps {
  quiz: Quiz;
  keywordsClassName?: string;
}

export function QuizGuide({ quiz, keywordsClassName }: QuizGuideProps) {
  const { modalOpen, openModal, closeModal } = useModal();

  return (
    <>
      {modalOpen && (
        <QuizAnswerModal answer={quiz.answer} closeModal={closeModal} />
      )}
      <div className={styles.quizContentContainer}>
        <QuizContent
          category={quiz.category}
          title={quiz.title}
          description={quiz.description}
        />
        <CommandAccordion
          width="100%"
          items={quiz.keywords}
          className={keywordsClassName}
        />
        <Button
          className={styles.checkAnswerButton}
          variant="secondaryFill"
          onClick={openModal}
        >
          모범 답안 확인하기
        </Button>
      </div>
    </>
  );
}
