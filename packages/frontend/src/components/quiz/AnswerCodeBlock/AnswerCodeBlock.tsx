import { toCodeTag } from "../../../utils/mapper";

import { answerContainer } from "./AnswerCodeBlock.css";

interface AnswerCodeBlockProps {
  answer: string[];
}

export function AnswerCodeBlock({ answer }: AnswerCodeBlockProps) {
  return (
    <p
      className={answerContainer}
      dangerouslySetInnerHTML={{
        __html: toCodeTag(answer.join("\n")),
      }}
    />
  );
}
