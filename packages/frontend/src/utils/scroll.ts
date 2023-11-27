import { RefObject } from "react";

export function scrollIntoView<T extends Element>(ref: RefObject<T>) {
  const $element = ref.current;
  if (!$element) {
    return;
  }

  $element.scrollIntoView();
}
