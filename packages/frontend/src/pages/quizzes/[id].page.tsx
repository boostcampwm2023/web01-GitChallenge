import axios, { isAxiosError } from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { RefObject, useEffect, useRef, useState } from "react";

import { quizAPI } from "../../apis/quiz";
import { Editor } from "../../components/editor";
import { QuizGuide } from "../../components/quiz/QuizGuide";
import { Terminal } from "../../components/terminal";
import { Button, toast } from "../../design-system/components/common";
import useResizableSplitView from "../../hooks/useResizableSplitView";
import { Categories, Command, Quiz } from "../../types/quiz";
import { TerminalContentType } from "../../types/terminalType";
import { scrollIntoView } from "../../utils/scroll";
import { isString } from "../../utils/typeGuard";

import * as styles from "./quiz.css";

export default function QuizPage({ quiz }: { quiz: Quiz }) {
  const [terminalMode, setTerminalMode] = useState<"command" | "editor">(
    "command",
  );
  const [editorFile, setEditorFile] = useState("");

  const [contentArray, setContentArray] = useState<TerminalContentType[]>([]);
  const {
    query: { id },
  } = useRouter();

  const terminalInputRef = useRef<HTMLSpanElement>(null);

  const handlePostCommandSuccess = ({
    data: { message, result },
    input,
  }: {
    data: Command;
    input: string;
  }) => {
    const requestResponseType = [
      terminalMode,
      isEditorResponse(result) ? "editor" : "command",
    ].join(" ");

    switch (requestResponseType) {
      case "command command":
        setContentArray([
          ...contentArray,
          { type: "stdin", content: input },
          { type: "stdout", content: message },
        ]);
        break;
      case "command editor":
        setTerminalMode("editor");
        setContentArray([...contentArray, { type: "stdin", content: input }]);
        setEditorFile(message);
        break;
      case "editor command":
        setTerminalMode("command");
        setContentArray([
          ...contentArray,
          { type: "stdout", content: message },
        ]);
        break;
      case "editor editor":
        setEditorFile(message);
        break;
      default:
        throw new Error();
    }
  };

  const handleTerminal = async (input: string) => {
    if (!isString(id)) {
      return;
    }

    try {
      const data = await quizAPI.postCommand({
        id: +id,
        mode: terminalMode,
        message: input,
      });
      handlePostCommandSuccess({ data, input });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        toast.error("지원하지 않는 명령어입니다.");
      }
    }
  };

  const handleReset = async () => {
    if (!isString(id)) {
      return;
    }

    try {
      await quizAPI.resetQuizById(+id);
      setContentArray([]);
      clearTextContent(terminalInputRef);
      terminalInputRef.current?.focus();
      toast.success("문제가 성공적으로 초기화되었습니다!");
    } catch (error) {
      toast.error(
        "문제 초기화 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
  };

  useEffect(() => {
    setContentArray([]);
    clearTextContent(terminalInputRef);
  }, [id]);

  useEffect(() => {
    scrollIntoView(terminalInputRef);
    clearTextContent(terminalInputRef);
  }, [contentArray]);

  const { barRef, topRef, handleBarHover } = useResizableSplitView();
  if (!quiz) return null;
  return (
    <main className={styles.mainContainer}>
      <div className={styles.mainInnerContainer}>
        <div className={styles.topContainer} ref={topRef}>
          <div style={{ width: "50%", display: "flex" }}>git graph</div>
          <QuizGuide quiz={quiz} />
        </div>
        <div
          className={styles.bar}
          role="button"
          tabIndex={0}
          ref={barRef}
          aria-label="divider"
          onMouseDown={handleBarHover}
        />
        <Terminal
          contentArray={contentArray}
          onTerminal={handleTerminal}
          ref={terminalInputRef}
        />
      </div>
      {terminalMode === "editor" ? (
        <Editor initialFile={editorFile} onSubmit={handleTerminal} />
      ) : (
        <Terminal
          contentArray={contentArray}
          onTerminal={handleTerminal}
          ref={terminalInputRef}
        />
      )}
      <div className={styles.buttonGroup}>
        <Button variant="secondaryLine" onClick={handleReset}>
          문제 다시 풀기
        </Button>
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

function clearTextContent<T extends Element>(ref: RefObject<T>) {
  const $element = ref.current;
  if (!$element) {
    return;
  }

  $element.textContent = "";
}

function isEditorResponse(result: Command["result"]): result is "editor" {
  return result === "editor";
}
