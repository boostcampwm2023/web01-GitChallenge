import { style } from "@vanilla-extract/css";

import color from "./color";

export const widthMax = style({ maxWidth: 1280 });
export const widthFull = style({ width: "100%" });
export const backLayer = style({ zIndex: -1 });
export const baseLayer = style({ zIndex: 0 });
export const middleLayer = style({ zIndex: 50 });
export const topLayer = style({ zIndex: 100 });
export const modalLayer = style({ zIndex: 1000 });
export const block = style({
  display: "block",
});
export const flex = style({
  display: "flex",
});
export const flexColumn = style([
  flex,
  {
    flexDirection: "column",
  },
]);
export const flexAlignCenter = style([
  flex,
  {
    alignItems: "center",
  },
]);
export const flexJustifyCenter = style([
  flex,
  {
    justifyContent: "center",
  },
]);
export const flexCenter = style([flex, flexAlignCenter, flexJustifyCenter]);
export const flexColumnCenter = style([
  flexCenter,
  {
    flexDirection: "column",
  },
]);

export const boxShadow = style({
  boxShadow: "0 3px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.05)",
});

export const scrollBarHidden = style({
  overflow: "scroll",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const border = {
  side: style({
    border: `1px solid ${color.$semantic.border}`,
    borderTop: "none",
    borderBottom: "none",
  }),
  all: style({
    border: `1px solid ${color.$semantic.border}`,
  }),
  top: style({ borderTop: `1px solid ${color.$semantic.border}` }),
  bottom: style({ borderBottom: `1px solid ${color.$semantic.border}` }),
};
