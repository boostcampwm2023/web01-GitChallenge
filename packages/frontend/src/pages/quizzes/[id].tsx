import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { quizAPI } from "../../apis/quizzes";
import * as styles from "../../components/demo/Demo.css";
import { CommandAccordion, QuizContent } from "../../components/quiz";
import { Terminal } from "../../components/terminal";
import { Button } from "../../design-system/components/common";
import { flex } from "../../design-system/tokens/utils.css";
import { Quiz } from "../../types/quiz";
import { TerminalContentType } from "../../types/terminalType";
import { isString } from "../../utils/typeGuard";

export default function QuizPage() {
  const [contentArray, setContentArray] = useState<TerminalContentType[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (!isString(id)) {
      return;
    }

    quizAPI.getQuiz(id).then((data) => setQuiz(data));
  }, [id]);
  const handleTerminal = async (input: string) => {
    if (!isString(id)) {
      return;
    }

    const data = await quizAPI.postCommand({
      id: +id,
      command: input,
    });
    setContentArray([
      ...contentArray,
      { type: "stdin", content: input },
      { type: "stdout", content: data.message },
    ]);
  };

  if (!quiz) return null;
  return (
    <main className={styles.main}>
      <div className={styles.mainInner}>
        <div className={flex}>
          <div className={styles.gitGraph} />
          <div className={styles.quizContentContainer}>
            <QuizContent
              category={quiz.category}
              title={quiz.title}
              description={quiz.description}
            />
            <div className={styles.commandAccordion}>
              <CommandAccordion items={quiz.keywords} />
            </div>
            <div className={styles.checkAnswerButton}>
              <Button variant="secondaryFill">모범 답안 확인하기</Button>
            </div>
          </div>
        </div>
        <Terminal contentArray={contentArray} onTerminal={handleTerminal} />
      </div>
      <div className={styles.submitButton}>
        <Button variant="primaryFill">제출 후 채점하기</Button>
      </div>
    </main>
  );
}
