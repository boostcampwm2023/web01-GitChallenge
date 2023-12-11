import {
  type Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { UserQuizStatus } from "../../types/user";
import { objectKeys } from "../../utils/types";

import { Action, UserQuizStatusActionType } from "./type";

const UserQuizStatusContext = createContext<UserQuizStatus>({});
const UserQuizStatusDispatchContext = createContext<Dispatch<Action>>(() => {});

interface UserQuizStatusProviderProps {
  initialUserQuizStatus: UserQuizStatus;
  children: ReactNode;
}

export function UserQuizStatusProvider({
  initialUserQuizStatus,
  children,
}: UserQuizStatusProviderProps) {
  const [userQuizStatus, dispatch] = useReducer(reducer, initialUserQuizStatus);

  useEffect(() => {
    dispatch({
      type: UserQuizStatusActionType.Initialize,
      data: initialUserQuizStatus,
    });
  }, [initialUserQuizStatus]);

  return (
    <UserQuizStatusContext.Provider value={userQuizStatus}>
      <UserQuizStatusDispatchContext.Provider value={dispatch}>
        {children}
      </UserQuizStatusDispatchContext.Provider>
    </UserQuizStatusContext.Provider>
  );
}

export function useUserQuizStatus() {
  const userQuizStatus = useContext(UserQuizStatusContext);
  if (!userQuizStatus) {
    throw new Error("UserQuizStatusProvider 컴포넌트로 래핑해야 합니다.");
  }
  return userQuizStatus;
}

export function useUserQuizStatusDispatch() {
  const dispatch = useContext(UserQuizStatusDispatchContext);
  if (!dispatch) {
    throw new Error("UserQuizStatusProvider 컴포넌트로 래핑해야 합니다.");
  }
  return dispatch;
}

function reducer(state: UserQuizStatus, action: Action): UserQuizStatus {
  switch (action.type) {
    case UserQuizStatusActionType.Initialize:
      return action.data;

    case UserQuizStatusActionType.Reset:
      return Object.fromEntries(objectKeys(state).map((key) => [key, false]));

    case UserQuizStatusActionType.ResetQuizById:
      return { ...state, [action.id]: false };

    case UserQuizStatusActionType.SolveQuizById:
      return { ...state, [action.id]: true };

    default:
      throw new Error(`${action} not supported`);
  }
}
