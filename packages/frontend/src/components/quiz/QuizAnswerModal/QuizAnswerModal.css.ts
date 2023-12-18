import { style } from "@vanilla-extract/css";

import color from "../../../design-system/tokens/color";
import typography from "../../../design-system/tokens/typography";

export const h3 = style([
  typography.$semantic.h3,
  { color: color.$scale.grey700, marginBottom: 20 },
]);
