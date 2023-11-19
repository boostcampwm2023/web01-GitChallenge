import { style } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import typography from "../../../tokens/typography";
import { flex } from "../../../tokens/utils.css";

export const container = style({
  backgroundColor: color.$scale.grey200,
});

export const content = style([
  flex,
  {
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 13,
  },
]);

export const teamName = style([
  typography.$semantic.title2Bold,
  {
    color: color.$scale.grey800,
  },
]);

export const teamInfo = style([
  typography.$semantic.caption1Regular,
  {
    flex: 1,
    color: color.$scale.grey600,
  },
]);

export const contact = style({
  color: color.$scale.grey600,
});

export const hr = style({
  margin: "20px 0",
  border: "none",
  borderTop: `1px solid ${color.$semantic.border}`,
});

export const rightsContainer = style([
  typography.$semantic.caption1Regular,
  {
    position: "relative",
    textAlign: "center",
    color: color.$scale.grey500,
  },
]);

export const rights = style({ position: "absolute", left: 0 });
