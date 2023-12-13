import { RefObject } from "react";

export function focusRef<T extends HTMLOrSVGElement>(
  ref: RefObject<T>,
  options?: FocusOptions,
) {
  ref.current?.focus(options);
}

export function scrollIntoViewRef<T extends Element>(
  ref: RefObject<T>,
  arg?: boolean | ScrollIntoViewOptions,
) {
  ref.current?.scrollIntoView(arg);
}
