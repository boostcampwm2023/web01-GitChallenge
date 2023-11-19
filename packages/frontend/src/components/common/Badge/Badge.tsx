import { ReactNode } from "react";

import classnames from "../../../utils/classnames";

import * as styles from "./Badge.css";

export interface BadgeProps {
  variant: styles.BadgeVariant;
  label: ReactNode;
}

export function Badge({ variant, label }: BadgeProps) {
  const badgeStyle = classnames(
    styles.badgeBaseStyle,
    styles.badgeVariants[variant],
  );
  return <span className={badgeStyle}>{label}</span>;
}
