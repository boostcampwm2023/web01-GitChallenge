import { API_PATH } from "../constants/path";
import { UserQuizStatus } from "../types/user";

import { instance } from "./base";

export const sessionAPI = {
  getSolved: async () => {
    const { data } = await instance.get<UserQuizStatus>(
      `${API_PATH.SESSION}/solved`,
    );
    return data;
  },
};
