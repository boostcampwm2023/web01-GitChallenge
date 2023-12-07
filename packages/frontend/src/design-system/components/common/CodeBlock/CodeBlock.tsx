import { container } from "./CodeBlock.css";

interface CodeBlockProps {
  code: string[];
  className?: string;
}

export function CodeBlock({ code, className = "" }: CodeBlockProps) {
  return (
    <p
      className={[className, container].join(" ").trim()}
      dangerouslySetInnerHTML={{
        __html: toCodeTag(code.join("\n")),
      }}
    />
  );
}

function toCodeTag(code: string) {
  return code.replaceAll(/`(.*?)`/g, "<code>$1</code>");
}
