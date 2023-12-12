export type TerminalContentType = StandardInputType | StandardOutputType;

export type StandardInputType = {
  type: "stdin";
  content: string;
  gitRef: string;
};

export type StandardOutputType = { type: "stdout"; content: string };
