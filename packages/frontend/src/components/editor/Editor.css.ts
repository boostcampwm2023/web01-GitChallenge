import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const textarea = style({
  resize: "none",
  height: 180,
});

export const input = style({});
