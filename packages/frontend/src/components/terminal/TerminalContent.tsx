import type {
  StandardInputType,
  StandardOutputType,
  TerminalContentType,
} from "../../types/terminalType";

import Prompt from "./Prompt";

interface TerminalContentProps {
  contentArray: TerminalContentType[];
}

export default function TerminalContent({
  contentArray,
}: TerminalContentProps) {
  const content = contentArray.map(toTerminalContentComponent);
  return <div>{content}</div>;
}

function StandardInputContent({
  content,
  gitRef,
}: Omit<StandardInputType, "type">) {
  return (
    <div>
      <Prompt gitRef={gitRef} />
      <span>{content}</span>
    </div>
  );
}

function StandardOutputContent({ content }: Omit<StandardOutputType, "type">) {
  return (
    <div>
      <span>{content}</span>
    </div>
  );
}

function toTerminalContentComponent(
  propsWithType: TerminalContentType,
  index: number,
) {
  const key = `${propsWithType.type} ${index}`;
  switch (propsWithType.type) {
    case "stdin": {
      const { type, ...props } = propsWithType;
      return <StandardInputContent key={key} {...props} />;
    }
    case "stdout": {
      const { type, ...props } = propsWithType;
      return <StandardOutputContent key={key} {...props} />;
    }
    default: {
      return null;
    }
  }
}
