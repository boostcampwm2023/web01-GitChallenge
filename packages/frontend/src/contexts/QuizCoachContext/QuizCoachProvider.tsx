import { ReactNode, useCallback, useMemo, useState } from "react";

import { QuizCoachActionContext, QuizCoachContext } from "./quizCoachContext";

interface QuizCoachProviderProps {
  children: ReactNode;
}

export function QuizCoachProvider({ children }: QuizCoachProviderProps) {
  const [run, setRun] = useState(false);

  const handleEnd = useCallback(() => {
    setRun(false);
  }, []);

  const handleStart = useCallback(() => {
    setRun(true);
  }, []);

  const quizCoachActionContextValue = useMemo(
    () => ({ handleEnd, handleStart }),
    [handleEnd, handleStart],
  );

  return (
    <QuizCoachContext.Provider value={run}>
      <QuizCoachActionContext.Provider value={quizCoachActionContextValue}>
        {children}
      </QuizCoachActionContext.Provider>
    </QuizCoachContext.Provider>
  );
}
