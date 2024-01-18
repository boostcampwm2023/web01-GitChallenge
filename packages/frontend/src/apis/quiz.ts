import { API_PATH } from "../constants/path";
import {
  Categories,
  Command,
  Quiz,
  QuizGitGraph,
  QuizSolve,
  SharedQuiz,
} from "../types/quiz";

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
    await instance.delete(`${API_PATH.QUIZZES}/${id}/command`);
  },
  getSharedAnswer: async (slug: string) => {
    const { data } = await instance.get<GetSharedAnswerResponse>(
      `${API_PATH.QUIZZES}/shared?answer=${slug}`,
    );
    return data;
  },
  getGraph: async (id: number) => {
    const { data } = await instance.get<GetQuizGraphResponse>(
      `${API_PATH.QUIZZES}/${id}/graph`,
    );
    return data;
  },
};

type PostCommandRequest = {
  id: number;
  mode: "command" | "editor";
  message: string;
};

export type GetSharedAnswerResponse = {
  answer: string[];
  quiz: SharedQuiz;
};

type GetQuizGraphResponse = {
  graph: QuizGitGraph;
  ref: string;
};
