import { type ReactNode } from "react";

import { itemStyle } from "./Accordion.css";
import { useAccordion } from "./AccordionContextProvider";

interface AccordionItemProps {
  className?: string;
  children: ReactNode;
}

export default function AccordionItem({
  className = itemStyle,
  children,
}: AccordionItemProps) {
  const accordionContext = useAccordion();
  if (!accordionContext) {
    throw new Error(
      "Accordion.Item 컴포넌트는 Accordion 컴포넌트로 래핑해야 합니다."
    );
  }

  return <li className={className}>{children}</li>;
}
