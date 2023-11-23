import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AccordionContextType = {
  open: boolean;
  width: number | string;
  onChange: (open: boolean) => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

export function useAccordion() {
  const accordionData = useContext(AccordionContext);
  return accordionData;
}

export function AccordionContextProvider({
  open: initOpen,
  width,
  children,
}: {
  open: boolean;
  width: number | string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(initOpen);

  const handleChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
    },
    [setOpen],
  );

  const accordionContextValue = useMemo(
    () => ({ open, onChange: handleChange, width }),
    [open, handleChange, width],
  );

  useEffect(() => {
    setOpen(initOpen);
  }, [initOpen]);

  return (
    <AccordionContext.Provider value={accordionContextValue}>
      {children}
    </AccordionContext.Provider>
  );
}
