export function preview(message: string): string {
  return message.length > 15 ? message.slice(0, 20) + '...' : message;
}
