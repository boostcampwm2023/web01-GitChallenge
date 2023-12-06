import { ReactNode } from "react";
import { FaInfoCircle } from "react-icons/fa";

import classnames from "../../../../utils/classnames";

import * as styles from "./Info.css";

interface InfoProps {
  className?: string;
  children: ReactNode;
}
export default function Info({ className = "", children }: InfoProps) {
  return (
    <div className={classnames(styles.container, className)}>
      <FaInfoCircle />
      <p>{children}</p>
    </div>
  );
}
