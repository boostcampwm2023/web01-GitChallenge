import { API_PATH } from "../constants/path";
import { UserQuizStatus } from "../types/user";

import { instance } from "./base";

export const sessionAPI = {
  resetSession: async () => {
    const { data } = await instance.delete(API_PATH.SESSION);
    return data;
  },
  getUserQuizStatus: async () => {
    const { data } = await instance.get<UserQuizStatus>(
      `${API_PATH.SESSION}/solved`,
    );
    return data;
  },
};
