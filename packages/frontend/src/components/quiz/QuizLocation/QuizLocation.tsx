import { list as listStyle } from "./QuizLocation.css";
import QuizLocationItem from "./QuizLocationItem";

interface QuizLocationProps {
  items: string[];
}

export default function QuizLocation({ items }: QuizLocationProps) {
  const { length } = items;

  const children = items.map((item, index) => (
    <QuizLocationItem key={item} title={item} last={isLast(index, length)} />
  ));

  return <ol className={listStyle}>{children}</ol>;
}

function isLast(index: number, length: number) {
  return index === length - 1;
}
