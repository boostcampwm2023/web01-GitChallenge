import type { ButtonHTMLAttributes, ReactNode } from "react";

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
  return (
    <button
      type={type === "button" ? "button" : "submit"}
      className={getButtonStyle({ full, variant })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function getButtonStyle({
  full,
  variant,
}: {
  full: boolean;
  variant: ButtonVariants;
}) {
  return [buttonBaseStyle, buttonVariantStyle[variant], full ? widthFull : ""]
    .join(" ")
    .trim();
}
