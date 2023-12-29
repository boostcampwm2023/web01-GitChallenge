import { createContext, useContext } from "react";

type QuizCoachActionContextType = {
  handleEnd: () => void;
  handleStart: () => void;
};

export const QuizCoachContext = createContext(false);
export const QuizCoachActionContext = createContext<QuizCoachActionContextType>(
  {} as QuizCoachActionContextType,
);

export function useQuizCoachContext() {
  return useContext(QuizCoachContext);
}

export function useQuizCoachActionContext() {
  return useContext(QuizCoachActionContext);
}
