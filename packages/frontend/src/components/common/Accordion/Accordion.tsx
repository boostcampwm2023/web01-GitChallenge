import { type ReactNode } from "react";

import { AccordionContextProvider } from "./AccordionContextProvider";
import AccordionDetails from "./AccordionDetails";
import AccordionItem from "./AccordionItem";
import AccordionList from "./AccordionList";
import AccordionSummary from "./AccordionSummary";

interface AccordionProps {
  width?: number;
  open?: boolean;
  children: ReactNode;
}

export default function Accordion({
  width = 200,
  open: initOpen = false,
  children,
}: AccordionProps) {
  return (
    <AccordionContextProvider open={initOpen} width={width}>
      {children}
    </AccordionContextProvider>
  );
}

Accordion.Details = AccordionDetails;
Accordion.Summary = AccordionSummary;
Accordion.List = AccordionList;
Accordion.Item = AccordionItem;
