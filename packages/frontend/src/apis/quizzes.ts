import { API_PATH } from "../constants/path";
import { Categories, Command, Quiz } from "../types/quiz";

import { instance } from "./base";

export const quizAPI = {
  postCommand: async ({ id, command }: PostCommandRequest) => {
    const { data } = await instance.post<Command>(
      `${API_PATH.QUIZZES}/${id}/command`,
      { command },
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
};

type PostCommandRequest = {
  id: number;
  command: string;
};
