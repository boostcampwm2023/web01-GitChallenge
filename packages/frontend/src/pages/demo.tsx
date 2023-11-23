import { useState } from "react";

import { requestCommand } from "../apis/request/quizzes";
import { CommandAccordion, QuizContent } from "../components/quiz";
import { Terminal } from "../components/terminal";
import { Button } from "../design-system/components/common";
import { flex } from "../design-system/tokens/utils.css";
import quizContentMockData from "../mocks/apis/data/quizContentData";
import { TerminalContentType } from "../types/terminalType";

import * as styles from "./demo.css";

const { category, title, description, keywords } = quizContentMockData;

export default function QuizPage() {
  const [contentArray, setContentArray] = useState<TerminalContentType[]>([]);

  const handleTerminal = async (input: string) => {
    const data = await requestCommand({
      id: 1,
      command: input,
    });
    setContentArray([
      ...contentArray,
      { type: "stdin", content: input },
      { type: "stdout", content: data.message },
    ]);
  };

  return (
    <main className={styles.main}>
      <div className={styles.mainInner}>
        <div className={flex}>
          <div className={styles.gitGraph} />

          <div className={styles.quizContentContainer}>
            <QuizContent
              category={category}
              title={title}
              description={description}
            />
            <div className={styles.commandAccordion}>
              <CommandAccordion items={keywords} />
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
