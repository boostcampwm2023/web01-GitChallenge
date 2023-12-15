import { style, styleVariants } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import typography from "../../../tokens/typography";
import { borderRadius } from "../../../tokens/utils.css";

export const buttonBase = style([
  typography.$semantic.title4Regular,
  borderRadius,
  {
    height: 42,
    border: "1px solid transparent",
    padding: "8px 13px",

    ":disabled": {
      borderColor: color.$semantic.bgDisabled,
      color: color.$semantic.textDisabled,
      backgroundColor: color.$semantic.bgDisabled,
    },
  },
]);

export const buttonVariants = styleVariants({
  primaryFill: {
    color: color.$semantic.textWhite,
    backgroundColor: color.$semantic.primary,

    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: color.$semantic.primaryHover,
      },
    },
  },

  secondaryFill: {
    color: color.$semantic.textWhite,
    backgroundColor: color.$semantic.secondary,

    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: color.$semantic.secondaryHover,
      },
    },
  },

  primaryLine: {
    border: `1px solid ${color.$semantic.primary}`,
    color: color.$semantic.primary,
    backgroundColor: color.$semantic.bgWhite,

    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: color.$semantic.primaryLow,
      },
    },
  },

  secondaryLine: {
    border: `1px solid ${color.$semantic.secondary}`,
    color: color.$semantic.secondary,
    backgroundColor: color.$semantic.bgWhite,

    selectors: {
      "&:hover:not(:disabled)": {
        color: color.$semantic.secondary,
        backgroundColor: color.$semantic.secondaryLow,
      },
    },
  },

  primaryLow: {
    color: color.$semantic.primary,
    backgroundColor: color.$semantic.primaryLow,

    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: color.$semantic.primaryLowHover,
      },
    },
  },

  secondaryLow: {
    color: color.$semantic.secondary,
    backgroundColor: color.$semantic.secondaryLow,

    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: color.$semantic.secondaryLowHover,
      },
    },
  },
});
