import { BsChevronRight } from "react-icons/bs";

import { flexAlignCenter } from "../../../design-system/tokens/utils.css";

import { icon as iconStyle, list as listStyle } from "./QuizLocation.css";

interface QuizLocationProps {
  items: string[];
}

export default function QuizLocation({ items }: QuizLocationProps) {
  const { length } = items;

  return (
    <ol className={listStyle}>
      {items.map((item, index) => (
        <li className={flexAlignCenter} key={item}>
          <span>{item}</span>
          {!isLast(index, length) && <ChevronRight />}
        </li>
      ))}
    </ol>
  );
}

function ChevronRight() {
  return (
    <span className={iconStyle}>
      <BsChevronRight size={10} />
    </span>
  );
}

function isLast(index: number, length: number) {
  return index === length - 1;
}
