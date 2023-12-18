export function toCodeTag(description: string) {
  return description.replaceAll(/`(.*?)`/g, "<code>$1</code>");
}
