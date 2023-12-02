import type { ButtonHTMLAttributes, ReactNode } from "react";

import classnames from "../../../../utils/classnames";
import { widthFull } from "../../../tokens/utils.css";

import * as styles from "./Button.css";

export type ButtonVariantType = keyof typeof styles.buttonVariants;

export interface ButtonProps
  extends Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "disabled" | "onClick"
  > {
  full?: boolean;
  variant: ButtonVariantType;
  children: ReactNode;
  className?: string;
}

export function Button({
  full = false,
  variant,
  children,
  type = "button",
  disabled = false,
  onClick,
  className = "",
}: ButtonProps) {
  const buttonStyle = classnames(
    styles.buttonBase,
    styles.buttonVariants[variant],
    full ? widthFull : "",
    className,
  );

  return (
    <button
      type={type === "button" ? "button" : "submit"}
      className={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
