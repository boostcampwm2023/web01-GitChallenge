import { rest } from "msw";

import { API_PATH } from "../../constants/path";
import { isString } from "../../utils/typeGuard";

const baseUrl = "/api/v1";
const quizPath = `${baseUrl}${API_PATH.QUIZZES}`;

export const quizHandlers = [
  rest.post(`${quizPath}/:id/submit`, (req, res, ctx) => {
    const { id } = req.params;
    if (!isString(id)) {
      return res(ctx.status(404));
    }

    const idNum = parseInt(id, 10);
    if (idNum < 1 || idNum > 19) {
      return res(ctx.status(404));
    }

    return res(ctx.json({ solved: true, link: "mock-share-link" }));
  }),
  rest.delete(`${quizPath}/:id/command`, (req, res, ctx) => {
    const { id } = req.params;
    if (!isString(id)) {
      return res(ctx.status(404));
    }

    const idNum = parseInt(id, 10);
    if (idNum < 1 || idNum > 19) {
      return res(ctx.status(404));
    }

    if (idNum === 1) {
      return res(ctx.status(500));
    }

    return res();
  }),
];
