import { type ReactNode } from "react";

import * as styles from "./Accordion.css";
import { useAccordion } from "./AccordionContextProvider";

interface AccordionListProps {
  className?: string;
  children: ReactNode;
}

export default function AccordionList({
  className = styles.list,
  children,
}: AccordionListProps) {
  const accordionContext = useAccordion();
  if (!accordionContext) {
    throw new Error(
      "Accordion.List 컴포넌트는 Accordion 컴포넌트로 래핑해야 합니다."
    );
  }

  return <ul className={className}>{children}</ul>;
}
