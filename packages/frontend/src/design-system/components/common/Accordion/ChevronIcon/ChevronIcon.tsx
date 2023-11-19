import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import classnames from "../../../../../utils/classnames";
import color from "../../../../tokens/color";

import * as styles from "./ChevronIcon.css";

interface ChevronIconProps {
  size: "md" | "sm";
  type: keyof typeof chevronIconMap;
}

export default function ChevronIcon({ type, size }: ChevronIconProps) {
  const containerStyle = classnames(
    styles.containerBase,
    styles.containerVariants[size]
  );

  const Chevron = chevronIconMap[type];

  return (
    <div className={containerStyle}>
      <Chevron color={color.$scale.grey600} size={chevronSizeMap[size]} />
    </div>
  );
}

const chevronIconMap = {
  up: BsChevronUp,
  down: BsChevronDown,
};

const chevronSizeMap = {
  sm: 10,
  md: 14,
};
