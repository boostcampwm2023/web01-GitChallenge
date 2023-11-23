import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { quizAPI } from "../../apis/quizzes";
import * as styles from "../../components/demo/Demo.css";
import { CommandAccordion, QuizContent } from "../../components/quiz";
import { Terminal } from "../../components/terminal";
import { Button } from "../../design-system/components/common";
import { flex } from "../../design-system/tokens/utils.css";
import { Categories, Quiz } from "../../types/quiz";
import { TerminalContentType } from "../../types/terminalType";
import { isString } from "../../utils/typeGuard";

export default function QuizPage({ quiz }: { quiz: Quiz }) {
  const [contentArray, setContentArray] = useState<TerminalContentType[]>([]);
  const {
    query: { id },
  } = useRouter();

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

export const getStaticProps = (async ({ params }: GetStaticPropsContext) => {
  const { data } = await axios.get<Quiz>(
    `https://git-challenge.com/api/v1/quizzes/${params?.id}`,
  );

  return {
    props: {
      quiz: data,
    },
  };
}) satisfies GetStaticProps<{
  quiz: Quiz;
}>;

export const getStaticPaths = (async () => {
  const {
    data: { categories },
  } = await axios.get<Categories>("https://git-challenge.com/api/v1/quizzes");

  const paths = categories.flatMap(({ quizzes }) =>
    quizzes.map(({ id }) => ({ params: { id: String(id) } })),
  );

  return { paths, fallback: "blocking" };
}) satisfies GetStaticPaths;
