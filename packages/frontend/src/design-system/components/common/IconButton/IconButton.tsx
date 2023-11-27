import { ButtonHTMLAttributes, ReactNode } from "react";

import classnames from "../../../../utils/classnames";

import * as styles from "./IconButton.css";

export interface IconButtonProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  className?: string;
  children: ReactNode;
}

export default function IconButton({
  className = "",
  children,
  onClick,
}: IconButtonProps) {
  const iconButtonStyle = classnames(styles.button, className);
  return (
    <button type="button" className={iconButtonStyle} onClick={onClick}>
      {children}
    </button>
  );
}
