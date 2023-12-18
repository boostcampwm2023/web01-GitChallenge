import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { GetSharedAnswerResponse, quizAPI } from "../../apis/quiz";
import { QuizContent } from "../../components/quiz";
import { BROWSWER_PATH } from "../../constants/path";
import {
  Button,
  CodeBlock,
  toast,
} from "../../design-system/components/common";
import typography from "../../design-system/tokens/typography";
import { isString } from "../../utils/typeGuard";

import * as styles from "./slug.css";

export default function AnswerSharePage() {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const [sharedAnswer, setSharedAnswer] = useState<GetSharedAnswerResponse>();

  const requestSharedAnswer = useCallback(
    async (newSlug: string) => {
      try {
        const newSharedAnswer = await quizAPI.getSharedAnswer(newSlug);
        setSharedAnswer(newSharedAnswer);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 400) {
          router.replace(BROWSWER_PATH.NOT_FOUND);
          return;
        }

        toast.error("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요");
      }
    },
    [router],
  );

  const handleLinkQuizPage = () => {
    if (!sharedAnswer) {
      return;
    }

    router.push(`${BROWSWER_PATH.QUIZZES}/${sharedAnswer.quiz.id}`);
  };

  useEffect(() => {
    if (!isString(slug)) {
      return;
    }

    requestSharedAnswer(slug);
  }, [slug, requestSharedAnswer]);

  if (!sharedAnswer) return null;

  const {
    answer,
    quiz: { title, description, category },
  } = sharedAnswer;
  return (
    <main className={styles.main}>
      <section className={styles.quizContainer}>
        <QuizContent
          title={title}
          description={description}
          category={category}
        />
        <Button
          variant="primaryFill"
          full
          onClick={handleLinkQuizPage}
          className={styles.quizLinkButton}
        >
          문제 풀어보러 가기
        </Button>
      </section>
      <section className={styles.answerContainer}>
        <h2 className={styles.h2}>공유된 답안</h2>
        <hr className={styles.hr} />
        <CodeBlock
          code={answer}
          className={typography.$semantic.body2Regular}
        />
      </section>
    </main>
  );
}
