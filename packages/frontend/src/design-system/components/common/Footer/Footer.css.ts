import { style } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import typography from "../../../tokens/typography";
import { border, flex } from "../../../tokens/utils.css";

export const container = style([
  border.top,
  {
    backgroundColor: color.$semantic.bgDefault,
  },
]);

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

export const hr = style([
  border.top,
  {
    margin: "20px 0",
  },
]);

export const rightsContainer = style([
  typography.$semantic.caption1Regular,
  {
    position: "relative",
    textAlign: "center",
    color: color.$scale.grey500,
  },
]);

export const rights = style({ position: "absolute", left: 0 });
