import { API_PATH } from "../constants/path";
import { Command, Quiz } from "../types/quiz";

import { instance } from "./base";

export const quizAPI = {
  postCommand: async ({ id, command }: PostCommandRequest) => {
    const { data } = await instance.post<Command>(
      `${API_PATH.QUIZZES}/${id}/command`,
      { command },
    );
    return data;
  },
  getQuiz: async (id: string) => {
    const { data } = await instance.get<Quiz>(`${API_PATH.QUIZZES}/${id}`);
    return data;
  },
};

type PostCommandRequest = {
  id: number;
  command: string;
};
