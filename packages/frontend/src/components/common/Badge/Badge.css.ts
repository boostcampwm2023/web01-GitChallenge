import { style, styleVariants } from "@vanilla-extract/css";

import color from "../../../styles/color";
import typography from "../../../styles/typography";

export const container = style({
  display: "flex",
  gap: 10,
});

export const badgeBaseStyle = style([
  typography.$semantic.caption2Regular,
  {
    color: color.$semantic.textWhite,
    height: 22,
    padding: "3px 7px",
    borderRadius: 5,
  },
]);

export const badgeVariants = styleVariants({
  orange: {
    color: color.$semantic.badgeOrange,
    backgroundColor: color.$semantic.badgeOrangeBg,
  },
  yellow: {
    color: color.$semantic.badgeYellow,
    backgroundColor: color.$semantic.badgeYellowBg,
  },
  green: {
    color: color.$semantic.badgeGreen,
    backgroundColor: color.$semantic.badgeGreenBg,
  },
  teal: {
    color: color.$semantic.badgeTeal,
    backgroundColor: color.$semantic.badgeTealBg,
  },
  blue: {
    color: color.$semantic.badgeBlue,
    backgroundColor: color.$semantic.badgeBlueBg,
  },
  purple: {
    color: color.$semantic.badgePurple,
    backgroundColor: color.$semantic.badgePurpleBg,
  },
});

export type BadgeVariant = keyof typeof badgeVariants;
