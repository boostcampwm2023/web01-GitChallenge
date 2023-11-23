import { API_PATH } from "../constants/path";
import { Command } from "../types/command";

import { instance } from "./base";

export const requestCommand = async ({
  id,
  command,
}: {
  id: number;
  command: string;
}) => {
  const { data } = await instance.post<Command>(
    `${API_PATH.QUIZZES}/${id}/command`,
    { command },
  );

  return data;
};
