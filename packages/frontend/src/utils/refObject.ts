import { RefObject } from "react";

export function focusRef<T extends HTMLOrSVGElement>(ref: RefObject<T>) {
  ref.current?.focus();
}

export function scrollIntoViewRef<T extends Element>(ref: RefObject<T>) {
  ref.current?.scrollIntoView();
}
