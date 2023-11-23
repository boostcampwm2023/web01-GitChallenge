export type CommandSuccess = "sucess";
export type CommandFail = "fail";

export type Command = {
  message: string;
  result: CommandSuccess | CommandFail;
  graph?: string;
};
