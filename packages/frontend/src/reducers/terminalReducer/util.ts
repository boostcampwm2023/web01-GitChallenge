import {
  StandardInputType,
  StandardOutputType,
} from "../../types/terminalType";

export function toStandardInput(
  content: string,
  gitRef: string = "",
): StandardInputType {
  return { type: "stdin", content, gitRef };
}

export function toStandardOutput(content: string): StandardOutputType {
  return { type: "stdout", content };
}
