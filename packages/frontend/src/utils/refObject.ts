import { RefObject } from "react";

export function focusRef<T extends HTMLOrSVGElement>(ref: RefObject<T>) {
  ref.current?.focus();
}
