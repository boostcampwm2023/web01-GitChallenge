import { UserQuizStatus } from "../../types/user";

export enum UserQuizStatusActionType {
  Initialize,
  Reset,
  ResetQuizById,
  SolveQuizById,
}

export type Action =
  | InitializeAction
  | ResetAction
  | ResetQuizByIdAction
  | SolveQuizByIdAction;

type InitializeAction = {
  type: UserQuizStatusActionType.Initialize;
  data: UserQuizStatus;
};

type ResetAction = {
  type: UserQuizStatusActionType.Reset;
};

type ResetQuizByIdAction = {
  type: UserQuizStatusActionType.ResetQuizById;
  id: number;
};

type SolveQuizByIdAction = {
  type: UserQuizStatusActionType.SolveQuizById;
  id: number;
};
