import { API_PATH } from "../constants/path";
import { Categories, Command, Quiz, QuizSolve } from "../types/quiz";

import { instance } from "./base";

export const quizAPI = {
  postCommand: async ({ id, mode, message }: PostCommandRequest) => {
    const { data } = await instance.post<Command>(
      `${API_PATH.QUIZZES}/${id}/command`,
      { mode, message },
    );
    return data;
  },
  getQuiz: async (id: number) => {
    const { data } = await instance.get<Quiz>(`${API_PATH.QUIZZES}/${id}`);
    return data;
  },
  getCategories: async () => {
    const { data } = await instance.get<Categories>(API_PATH.QUIZZES);
    return data;
  },
  submit: async (id: number) => {
    const { data } = await instance.post<QuizSolve>(
      `${API_PATH.QUIZZES}/${id}/submit`,
    );
    return data;
  },
  resetQuizById: async (id: number) => {
    const { data } = await instance.delete(`${API_PATH.QUIZZES}/${id}/command`);
    return data;
  },
};

type PostCommandRequest = {
  id: number;
  mode: "command" | "editor";
  message: string;
};
