export function preview(message: string): string {
  return message.length > 15 ? message.slice(0, 20) + '...' : message;
}

export function processCarriageReturns(data: string) {
  return data
    .split('\n')
    .map((line) => {
      const carriageReturnIndex = line.lastIndexOf('\r');
      return carriageReturnIndex !== -1
        ? line.substring(carriageReturnIndex + 1)
        : line;
    })
    .join('\n');
}
