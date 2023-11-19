import { BsChevronRight } from "react-icons/bs";

import { flexAlignCenter } from "../../../design-system/tokens/utils.css";

import { icon as iconStyle } from "./QuizLocation.css";

interface QuizLocationItemProps {
  title: string;
  last: boolean;
}

export default function QuizLocationItem({
  title,
  last,
}: QuizLocationItemProps) {
  return (
    <li className={flexAlignCenter}>
      <span>{title}</span>
      {!last && (
        <span className={iconStyle}>
          <BsChevronRight size={10} />
        </span>
      )}
    </li>
  );
}
