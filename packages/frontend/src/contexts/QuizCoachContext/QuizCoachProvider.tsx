import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { createLocalStorage } from "../../utils/webStorage";

import { QuizCoachActionContext, QuizCoachContext } from "./quizCoachContext";

const quizTutorialEndStorage = createLocalStorage("quiz-tutorial-end", false);

interface QuizCoachProviderProps {
  children: ReactNode;
}

export function QuizCoachProvider({ children }: QuizCoachProviderProps) {
  const [run, setRun] = useState(false);

  const handleEnd = useCallback(() => {
    setRun(false);
    quizTutorialEndStorage.setItem(true);
  }, []);

  const handleStart = useCallback(() => {
    setRun(true);
    quizTutorialEndStorage.removeItem();
  }, []);

  const quizCoachActionContextValue = useMemo(
    () => ({ handleEnd, handleStart }),
    [handleEnd, handleStart],
  );

  useEffect(() => {
    const tutorialEnd = quizTutorialEndStorage.getItem();
    setRun(!tutorialEnd);
  }, []);

  return (
    <QuizCoachContext.Provider value={run}>
      <QuizCoachActionContext.Provider value={quizCoachActionContextValue}>
        {children}
      </QuizCoachActionContext.Provider>
    </QuizCoachContext.Provider>
  );
}
