import { TerminalAction, TerminalActionTypes, TerminalState } from "./type";
import { toStandardInput, toStandardOutput } from "./util";

export const initialTerminalState: TerminalState = {
  terminalMode: "command",
  editorFile: "",
  contentArray: [],
};

export function terminalReducer(
  state: TerminalState,
  action: TerminalAction,
): TerminalState {
  switch (action.type) {
    case TerminalActionTypes.commandToCommand:
      return {
        ...state,
        contentArray: [
          ...state.contentArray,
          toStandardInput(action.input, action.gitRef),
          toStandardOutput(action.message),
        ],
      };

    case TerminalActionTypes.commandToEditor:
      return {
        terminalMode: "editor",
        contentArray: [
          ...state.contentArray,
          toStandardInput(action.input, action.gitRef),
        ],
        editorFile: action.message,
      };

    case TerminalActionTypes.editorToCommand:
      return {
        terminalMode: "command",
        contentArray: [...state.contentArray, toStandardOutput(action.message)],
        editorFile: initialTerminalState.editorFile,
      };

    case TerminalActionTypes.editorToEditor:
      return {
        ...state,
        editorFile: action.message,
      };

    case TerminalActionTypes.reset:
      return initialTerminalState;

    default:
      throw new Error(`${action} not supported`);
  }
}

export const terminalActionTypeMap = {
  command: {
    success: TerminalActionTypes.commandToCommand,
    fail: TerminalActionTypes.commandToCommand,
    editor: TerminalActionTypes.commandToEditor,
  },
  editor: {
    success: TerminalActionTypes.editorToCommand,
    fail: TerminalActionTypes.editorToCommand,
    editor: TerminalActionTypes.editorToEditor,
  },
};
