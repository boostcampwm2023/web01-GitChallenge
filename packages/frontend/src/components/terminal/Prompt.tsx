import classnames from "../../utils/classnames";

import { prompt as promptStyle } from "./Terminal.css";

const USER_NAME = "root";

interface PromptProps {
  gitRef: string;
}

export default function Prompt({ gitRef }: PromptProps) {
  return (
    <span className={promptStyle}>
      {formatPromptInfo(USER_NAME, gitRef)} &gt;&gt;
    </span>
  );
}

function formatPromptInfo(username: string, gitRef: string) {
  return classnames(username, gitRef ? `(${gitRef})` : "");
}
