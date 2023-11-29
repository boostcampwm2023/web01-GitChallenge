import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { quizAPI } from "../../apis/quiz";
import { QuizGuide } from "../../components/quiz/QuizGuide";
import { Terminal } from "../../components/terminal";
import { Button } from "../../design-system/components/common";
import { Categories, Quiz } from "../../types/quiz";
import { TerminalContentType } from "../../types/terminalType";
import { isString } from "../../utils/typeGuard";

import * as styles from "./quiz.css";

export default function QuizPage({ quiz }: { quiz: Quiz }) {
  const [contentArray, setContentArray] = useState<TerminalContentType[]>([]);
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    setContentArray([]);
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
    <main className={styles.mainContainer}>
      <div className={styles.topContainer}>
        <div style={{ width: "50%", display: "flex" }}>git graph</div>
        <QuizGuide quiz={quiz} />
      </div>
      <Terminal contentArray={contentArray} onTerminal={handleTerminal} />
      <div className={styles.buttonGroup}>
        <Button variant="secondaryLine">문제 다시 풀기</Button>
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
