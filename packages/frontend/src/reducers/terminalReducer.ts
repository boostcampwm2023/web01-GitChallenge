import { TerminalContentType } from "../types/terminalType";

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
          toStandardInput(action.input),
          toStandardOutput(action.message),
        ],
      };

    case TerminalActionTypes.commandToEditor:
      return {
        terminalMode: "editor",
        contentArray: [...state.contentArray, toStandardInput(action.input)],
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

    case TerminalActionTypes.clearTerminal:
      return {
        ...state,
        contentArray: [],
      };

    default:
      throw new Error(`${action} not supported`);
  }
}

function toStandardInput(content: string) {
  return toContentArrayItem("stdin", content);
}

function toStandardOutput(content: string) {
  return toContentArrayItem("stdout", content);
}

function toContentArrayItem(type: "stdin" | "stdout", content: string) {
  return { type, content: content.trim() };
}

type TerminalState = {
  terminalMode: "command" | "editor";
  editorFile: string;
  contentArray: TerminalContentType[];
};

export enum TerminalActionTypes {
  commandToCommand = "commandToCommand",
  commandToEditor = "commandToEditor",
  editorToCommand = "editorToCommand",
  editorToEditor = "editorToEditor",
  clearTerminal = "clearTerminal",
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

type TerminalAction =
  | CommandToCommand
  | CommandToEditor
  | EditorToCommand
  | EditorToEditor
  | ClearTerminal;

type CommandToCommand = RequestToResponse<TerminalActionTypes.commandToCommand>;
type CommandToEditor = RequestToResponse<TerminalActionTypes.commandToEditor>;
type EditorToCommand = RequestToResponse<TerminalActionTypes.editorToCommand>;
type EditorToEditor = RequestToResponse<TerminalActionTypes.editorToEditor>;
type ClearTerminal = { type: TerminalActionTypes.clearTerminal };

type RequestToResponse<Type> = {
  type: Type;
  input: string;
  message: string;
};
