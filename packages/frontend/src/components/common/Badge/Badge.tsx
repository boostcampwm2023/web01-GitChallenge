import { ReactNode } from "react";

import classnames from "../../../utils/classnames";

import { badgeVariants } from "./Badge.css";
import * as styles from "./Badge.css";

export type BadgeVariantType = keyof typeof badgeVariants;

export interface BadgeProps {
  variant: BadgeVariantType;
  label: ReactNode;
}

export function Badge({ variant, label }: BadgeProps) {
  const badgeStyle = classnames(
    styles.badgeBase,
    styles.badgeVariants[variant],
  );
  return <span className={badgeStyle}>{label}</span>;
}
