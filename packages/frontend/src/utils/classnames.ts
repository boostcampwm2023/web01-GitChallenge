export default function classnames(...args: string[]) {
  return args
    .map((value) => value.trim())
    .filter(isTruthy)
    .join(" ")
    .trim();
}

function isTruthy(value: unknown) {
  return !!value;
}
