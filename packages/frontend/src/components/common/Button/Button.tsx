import type { ButtonHTMLAttributes, ReactNode } from "react";

import classnames from "../../../utils/classnames";

import {
  type ButtonVariants,
  buttonBaseStyle,
  buttonVariantStyle,
  widthFull,
} from "./Button.css";

export interface ButtonProps
  extends Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "disabled" | "onClick"
  > {
  full?: boolean;
  variant: ButtonVariants;
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
    buttonBaseStyle,
    buttonVariantStyle[variant],
    full ? widthFull : ""
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
