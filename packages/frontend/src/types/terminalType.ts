export type TerminalContentType = StandardInputType | StandardOutputType;

export type StandardInputType = WithContentType<"stdin">;
export type StandardOutputType = WithContentType<"stdout">;

type WithContentType<T> = { type: T; content: string };
