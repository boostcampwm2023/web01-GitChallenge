import { style } from "@vanilla-extract/css";

import { flex } from "../../../design-system/tokens/utils.css";

const badgeGroupLayout = style([
  flex,
  {
    marginTop: "6px",
    gap: 10,
  },
]);

export default badgeGroupLayout;
