import React, {
  type MouseEventHandler,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { itemStyle, listStyle, summaryStyle } from "./Accordion.css";
import ChevronIcon from "./ChevronIcon/ChevronIcon";

interface WithChildren {
  children: ReactNode;
}

interface AccordionProps extends WithChildren {
  width?: number;
  open?: boolean;
}

type AccordionContextType = {
  open: boolean;
  width: number;
  onChange: (open: boolean) => void;
};
const AccordionContext = createContext<AccordionContextType | null>(null);

const useAccordion = () => {
  const accordionData = useContext(AccordionContext);
  return accordionData;
};

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

Accordion.Summary = Summary;
Accordion.List = List;
Accordion.Item = Item;

function AccordionContextProvider({
  open: initOpen,
  width,
  children,
}: {
  open: boolean;
  width: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(initOpen);

  const handleChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
    },
    [setOpen]
  );

  const accordionContextValue = useMemo(
    () => ({ open, onChange: handleChange, width }),
    [open, handleChange, width]
  );

  useEffect(() => {
    setOpen(initOpen);
  }, [initOpen]);

  return (
    <AccordionContext.Provider value={accordionContextValue}>
      <Details>{children}</Details>
    </AccordionContext.Provider>
  );
}

function Details({ children }: WithChildren) {
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

function Summary({ children }: WithChildren) {
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

function List({ children }: WithChildren) {
  const accordionContext = useAccordion();
  if (!accordionContext) {
    throw new Error(
      "Accordion.List 컴포넌트는 Accordion 컴포넌트로 래핑해야 합니다."
    );
  }

  return <ul className={listStyle}>{children}</ul>;
}

function Item({ children }: WithChildren) {
  const accordionContext = useAccordion();
  if (!accordionContext) {
    throw new Error(
      "Accordion.Item 컴포넌트는 Accordion 컴포넌트로 래핑해야 합니다."
    );
  }

  return <li className={itemStyle}>{children}</li>;
}
