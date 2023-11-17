import { MouseEventHandler, type ReactNode } from "react";

import { summaryStyle } from "./Accordion.css";
import { useAccordion } from "./AccordionContextProvider";
import ChevronIcon from "./ChevronIcon/ChevronIcon";

interface AccordionSummaryProps {
  children: ReactNode;
}

export default function AccordionSummary({ children }: AccordionSummaryProps) {
  const accordionContext = useAccordion();
  if (!accordionContext) {
    throw new Error(
      "Accordion.Summary 컴포넌트는 Accordion 컴포넌트로 래핑해야 합니다."
    );
  }

  const { open, onChange } = accordionContext;
  const chevronType = open ? "up" : "down";

  const handleChange: MouseEventHandler = (event) => {
    event.preventDefault();
    onChange(!open);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <summary className={summaryStyle} onClick={handleChange}>
      <div>{children}</div>
      <div>
        <ChevronIcon type={chevronType} />
      </div>
    </summary>
  );
}
