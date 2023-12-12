import axios, { isAxiosError } from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { RefObject, useEffect, useReducer, useRef, useState } from "react";

import { quizAPI } from "../../apis/quiz";
import { Editor } from "../../components/editor";
import EditorInfo from "../../components/editor/EditorInfo";
import { Graph } from "../../components/graph";
import { SolvedModal, useSolvedModal } from "../../components/quiz";
import { QuizGuide } from "../../components/quiz/QuizGuide";
import { Terminal } from "../../components/terminal";
import { BROWSWER_PATH } from "../../constants/path";
import {
  UserQuizStatusActionType,
  useUserQuizStatusDispatch,
} from "../../contexts/UserQuizStatusContext";
import { Button, toast } from "../../design-system/components/common";
import useResizableSplitView from "../../hooks/useResizableSplitView";
import {
  TerminalActionTypes,
  initialTerminalState,
  terminalActionTypeMap,
  terminalReducer,
} from "../../reducers/terminalReducer";
import { Categories, Quiz, QuizGitGraphCommit } from "../../types/quiz";
import { TerminalContentType } from "../../types/terminalType";
import { focusRef, scrollIntoViewRef } from "../../utils/refObject";
import { isString } from "../../utils/typeGuard";

import * as styles from "./quiz.css";

export default function QuizPage({ quiz }: { quiz: Quiz }) {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const [gitGraphData, setGitGraphData] = useState<QuizGitGraphCommit[]>([]);
  const [gitRef, setGitRef] = useState("");
  const userQuizStatusDispatcher = useUserQuizStatusDispatch();

  const solvedModal = useSolvedModal(isString(id) ? +id : -1);
  const [{ terminalMode, editorFile, contentArray }, terminalDispatch] =
    useReducer(terminalReducer, initialTerminalState);

  const terminalInputRef = useRef<HTMLSpanElement>(null);

  const fetchGitGraphDataRef = useRef(async (curId: number) => {
    try {
      const { graph, ref } = await quizAPI.getGraph(curId);
      setGitGraphData(graph);
      setGitRef(ref);
    } catch (error) {
      handleResponseError(error);
    }
  });

  const handleTerminal = async (input: string) => {
    if (!isString(id)) {
      return;
    }

    try {
      const {
        result,
        message,
        graph,
        ref: nextGitRef,
      } = await quizAPI.postCommand({
        id: +id,
        mode: terminalMode,
        message: input,
      });
      if (graph) {
        setGitGraphData(graph);
      }
      terminalDispatch({
        type: terminalActionTypeMap[terminalMode][result],
        input,
        message,
        gitRef,
      });
      setGitRef(nextGitRef);
    } catch (error) {
      handleResponseError(error, terminalMode);
    }
  };

  const handleSubmit = async () => {
    if (!isString(id)) {
      return;
    }

    const numId = +id;

    try {
      const response = await quizAPI.submit(numId);
      if (response.solved) {
        const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}${BROWSWER_PATH.SHARE}/${response.slug}`;
        userQuizStatusDispatcher({
          type: UserQuizStatusActionType.SolveQuizById,
          id: numId,
        });
        solvedModal.onSolved(shareLink);
        return;
      }
      toast.error("다시 풀어보세요!");
    } catch (error) {
      handleResponseError(error);
    }
  };

  const handleNextQuizPage = () => {
    if (!isString(id)) {
      return;
    }

    solvedModal.closeModal();
    router.push(`${BROWSWER_PATH.QUIZZES}/${+id + 1}`);
  };

  const handleReset = async () => {
    if (!isString(id)) {
      return;
    }

    const numId = +id;

    try {
      await quizAPI.resetQuizById(numId);
      fetchGitGraphDataRef?.current(numId);
      terminalDispatch({ type: TerminalActionTypes.reset });
      clearTextContent(terminalInputRef);
      focusRef(terminalInputRef);
      userQuizStatusDispatcher({
        type: UserQuizStatusActionType.ResetQuizById,
        id: numId,
      });
      toast.success("문제가 성공적으로 초기화되었습니다!");
    } catch (error) {
      toast.error(
        "문제 초기화 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
  };

  useEffect(() => {
    if (isString(id)) {
      fetchGitGraphDataRef?.current(+id);
    }
    terminalDispatch({ type: TerminalActionTypes.reset });
    clearTextContent(terminalInputRef);
    focusRef(terminalInputRef);
  }, [id]);

  useEffect(() => {
    scrollIntoViewRef(terminalInputRef);
    clearTextContent(terminalInputRef);
    focusRef(terminalInputRef);
  }, [contentArray]);

  const { barRef, topRef, handleBarHover } = useResizableSplitView();
  if (!quiz) return null;
  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.mainInnerContainer}>
          <div className={styles.topContainer} ref={topRef}>
            <Graph className={styles.graph} data={gitGraphData} />
            <QuizGuide quiz={quiz} />
          </div>
          <div
            className={styles.bar}
            role="button"
            tabIndex={0}
            ref={barRef}
            aria-label="divider"
            onMouseDown={handleBarHover}
          >
            {getTerminalInfo({ terminalMode, contentArray })}
          </div>
          {isEditorMode(terminalMode) ? (
            <Editor initialFile={editorFile} onSubmit={handleTerminal} />
          ) : (
            <Terminal
              gitRef={gitRef}
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
          onNextQuiz={handleNextQuizPage}
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

function handleResponseError(
  error: unknown,
  curTerminalMode?: "command" | "editor",
) {
  if (
    isAxiosError(error) &&
    error.response?.status === 403 &&
    curTerminalMode === "command"
  ) {
    toast.error("지원하지 않는 명령어입니다.");
    return;
  }

  toast.error("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요");
}

function getTerminalInfo({
  terminalMode,
  contentArray,
}: {
  terminalMode: "command" | "editor";
  contentArray: TerminalContentType[];
}) {
  const VI = "vi";
  const EDITOR_REDIRECTION = " ◀ ";

  return isEditorMode(terminalMode)
    ? [VI, getCommandOpenEditor(contentArray)].join(EDITOR_REDIRECTION)
    : "";
}

function getCommandOpenEditor(contentArray: TerminalContentType[]) {
  const index = contentArray.findLastIndex(({ type }) => type === "stdin");
  return index < 0 ? "" : contentArray[index].content;
}
