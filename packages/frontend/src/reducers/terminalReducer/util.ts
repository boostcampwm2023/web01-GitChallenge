export function toStandardInput(content: string) {
  return toContentArrayItem("stdin", content);
}

export function toStandardOutput(content: string) {
  return toContentArrayItem("stdout", content);
}

export function toContentArrayItem(type: "stdin" | "stdout", content: string) {
  return { type, content };
}
