import { type ReactNode, useEffect, useRef } from "react";

import { useAccordion } from "./AccordionContextProvider";

interface AccordionDetailsProps {
  children: ReactNode;
}

export default function AccordionDetails({ children }: AccordionDetailsProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const accordionContext = useAccordion();
  if (!accordionContext) {
    throw new Error(
      "Accordion.Details 컴포넌트는 Accordion 컴포넌트로 래핑해야 합니다."
    );
  }

  const { width, open, onChange } = accordionContext;

  useEffect(() => {
    if (!detailsRef.current) {
      return undefined;
    }

    const $details = detailsRef.current;

    const handleBeforeMatch = (event: Event) => {
      const { target } = event;
      if (!(target instanceof HTMLDetailsElement)) {
        return;
      }

      const detailsOpen = target.open;
      if (detailsOpen === open) {
        return;
      }

      onChange(detailsOpen);
    };

    $details.addEventListener("toggle", handleBeforeMatch);
    return () => {
      $details.removeEventListener("toggle", handleBeforeMatch);
    };
  }, [onChange, open]);

  return (
    <details ref={detailsRef} style={{ width }} open={open}>
      {children}
    </details>
  );
}
