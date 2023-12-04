import axios, { isAxiosError } from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { RefObject, useEffect, useReducer, useRef } from "react";

import { quizAPI } from "../../apis/quiz";
import { Editor } from "../../components/editor";
import EditorInfo from "../../components/editor/EditorInfo";
import { SolvedModal } from "../../components/quiz";
import { QuizGuide } from "../../components/quiz/QuizGuide";
import { Terminal } from "../../components/terminal";
import { Button, toast } from "../../design-system/components/common";
import useResizableSplitView from "../../hooks/useResizableSplitView";
import { useSolvedModal } from "../../hooks/useSolvedModal";
import {
  TerminalActionTypes,
  initialTerminalState,
  terminalActionTypeMap,
  terminalReducer,
} from "../../reducers/terminalReducer";
import { Categories, Quiz } from "../../types/quiz";
import { scrollIntoView } from "../../utils/scroll";
import { isString } from "../../utils/typeGuard";

import * as styles from "./quiz.css";

export default function QuizPage({ quiz }: { quiz: Quiz }) {
  const {
    query: { id },
  } = useRouter();

  const solvedModal = useSolvedModal(isString(id) ? +id : -1);
  const [{ terminalMode, editorFile, contentArray }, terminalDispatch] =
    useReducer(terminalReducer, initialTerminalState);

  const terminalInputRef = useRef<HTMLSpanElement>(null);

  const handleTerminal = async (input: string) => {
    if (!isString(id)) {
      return;
    }

    try {
      const { result, message } = await quizAPI.postCommand({
        id: +id,
        mode: terminalMode,
        message: input,
      });
      terminalDispatch({
        type: terminalActionTypeMap[terminalMode][result],
        input,
        message,
      });
    } catch (error) {
      handleResponseError(error);
    }
  };

  const handleSubmit = async () => {
    if (!isString(id)) {
      return;
    }

    try {
      const response = await quizAPI.submit(+id);
      if (response.solved) {
        solvedModal.onSolved(response.link);
        return;
      }
      toast.error("다시 풀어보세요!");
    } catch (error) {
      handleResponseError(error);
    }
  };

  const handleResponseError = (error: unknown) => {
    if (
      isAxiosError(error) &&
      error.response?.status === 403 &&
      terminalMode === "command"
    ) {
      toast.error("지원하지 않는 명령어입니다.");
      return;
    }

    toast.error("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요");
  };

  const handleReset = async () => {
    if (!isString(id)) {
      return;
    }

    try {
      await quizAPI.resetQuizById(+id);
      terminalDispatch({ type: TerminalActionTypes.reset });
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
    terminalDispatch({ type: TerminalActionTypes.reset });
    clearTextContent(terminalInputRef);
  }, [id]);

  useEffect(() => {
    scrollIntoView(terminalInputRef);
    clearTextContent(terminalInputRef);
  }, [contentArray]);

  const { barRef, topRef, handleBarHover } = useResizableSplitView();
  if (!quiz) return null;
  return (
    <>
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
          {isEditorMode(terminalMode) ? (
            <Editor initialFile={editorFile} onSubmit={handleTerminal} />
          ) : (
            <Terminal
              contentArray={contentArray}
              onTerminal={handleTerminal}
              ref={terminalInputRef}
            />
          )}
        </div>
        {isEditorMode(terminalMode) && <EditorInfo />}
        <div className={styles.buttonGroup}>
          <Button variant="secondaryLine" onClick={handleReset}>
            문제 다시 풀기
          </Button>
          <Button variant="primaryFill" onClick={handleSubmit}>
            제출 후 채점하기
          </Button>
        </div>
      </main>
      {solvedModal.modalOpen && (
        <SolvedModal
          link={solvedModal.shareLink}
          lastQuiz={solvedModal.lastQuiz}
          onClose={solvedModal.closeModal}
          onNextQuiz={console.log}
        />
      )}
    </>
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

function isEditorMode(terminalMode: "editor" | "command") {
  return terminalMode === "editor";
}
