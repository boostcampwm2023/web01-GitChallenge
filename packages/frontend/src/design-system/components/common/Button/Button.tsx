import type { ButtonHTMLAttributes, ReactNode } from "react";

import classnames from "../../../../utils/classnames";
import * as utils from "../../../tokens/utils.css";

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
}

export function Button({
  full = false,
  variant,
  children,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const buttonStyle = classnames(
    styles.buttonBase,
    styles.buttonVariants[variant],
    full ? utils.widthFull : "",
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
