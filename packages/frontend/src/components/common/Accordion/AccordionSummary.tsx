import { MouseEventHandler, type ReactNode } from "react";

import classnames from "../../../utils/classnames";

import * as styles from "./Accordion.css";
import {
  type AccordionContextType,
  useAccordion,
} from "./AccordionContextProvider";
import ChevronIcon from "./ChevronIcon/ChevronIcon";

interface AccordionSummaryProps {
  color?: "black" | "grey";
  size?: "md" | "sm";
  children: ReactNode | RenderComponentType;
}

type RenderComponentType = (props: AccordionContextType) => ReactNode;

export default function AccordionSummary({
  color = "black",
  size = "md",
  children,
}: AccordionSummaryProps) {
  const accordionContext = useAccordion();
  if (!accordionContext) {
    throw new Error(
      "Accordion.Summary 컴포넌트는 Accordion 컴포넌트로 래핑해야 합니다."
    );
  }

  const summaryStyle = classnames(
    styles.summaryText[size],
    styles.summaryColor[color],
    styles.summaryContainer[size]
  );

  const { open, onChange } = accordionContext;
  const chevronType = open ? "up" : "down";

  const handleChange: MouseEventHandler = (event) => {
    event.preventDefault();
    onChange(!open);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <summary className={summaryStyle} onClick={handleChange}>
      <div>
        {children instanceof Function ? children(accordionContext) : children}
      </div>
      <div>
        <ChevronIcon type={chevronType} size={size} />
      </div>
    </summary>
  );
}
