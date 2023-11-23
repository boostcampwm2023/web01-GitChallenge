export type CommandSuccess = "success";
export type CommandFail = "fail";
export type CommandVI = "vi";

export type Command = {
  message: string;
  result: CommandSuccess | CommandFail | CommandVI;
  graph?: string;
};
