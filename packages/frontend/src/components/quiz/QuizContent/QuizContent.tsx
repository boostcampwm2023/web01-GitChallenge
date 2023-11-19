import QuizLocation from "../QuizLocation";

import * as styles from "./QuizContent.css";

interface QuizContentProps {
  title: string;
  description: string;
  category: string;
}

export default function QuizContent({
  title,
  description,
  category,
}: QuizContentProps) {
  return (
    <>
      <QuizLocation items={[category, title]} />
      <strong className={styles.strong}>문제</strong>
      <p className={styles.description}>{description}</p>
    </>
  );
}
