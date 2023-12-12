import { TerminalContentType } from "../../types/terminalType";

export type TerminalState = {
  terminalMode: "command" | "editor";
  editorFile: string;
  contentArray: TerminalContentType[];
};

export enum TerminalActionTypes {
  commandToCommand = "commandToCommand",
  commandToEditor = "commandToEditor",
  editorToCommand = "editorToCommand",
  editorToEditor = "editorToEditor",
  reset = "reset",
}

export type TerminalAction =
  | CommandToCommand
  | CommandToEditor
  | EditorToCommand
  | EditorToEditor
  | ClearTerminal;

type CommandToCommand = RequestToResponse<TerminalActionTypes.commandToCommand>;
type CommandToEditor = RequestToResponse<TerminalActionTypes.commandToEditor>;
type EditorToCommand = RequestToResponse<TerminalActionTypes.editorToCommand>;
type EditorToEditor = RequestToResponse<TerminalActionTypes.editorToEditor>;
type ClearTerminal = { type: TerminalActionTypes.reset };

type RequestToResponse<Type> = {
  type: Type;
  input: string;
  message: string;
  gitRef: string;
};
