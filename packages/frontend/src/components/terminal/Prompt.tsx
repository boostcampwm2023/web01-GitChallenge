import * as styles from "./Prompt.css";

const USER_NAME = "root";

interface PromptProps {
  gitRef: string;
}

export default function Prompt({ gitRef }: PromptProps) {
  return (
    <span className={styles.prompt}>
      <span className={styles.username}>{USER_NAME}</span>
      {gitRef && <span className={styles.gitRef}>({gitRef})</span>}
      &gt;&gt;
    </span>
  );
}
