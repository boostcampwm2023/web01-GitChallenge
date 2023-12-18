import { RefObject } from "react";

export function createClassManipulator<T extends Element>(
  ref: RefObject<T>,
  className: string,
) {
  return (action: "add" | "remove") =>
    ref.current?.classList[action](className);
}
