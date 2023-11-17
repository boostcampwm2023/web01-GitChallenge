import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import color from "../../../../styles/color";

import containerStyle from "./ChevronIcon.css";

interface ChevronIconProps {
  type: keyof typeof chevronMap;
}

export default function ChevronIcon({ type }: ChevronIconProps) {
  const Chevron = chevronMap[type];
  return (
    <div className={containerStyle}>
      <Chevron color={color.$scale.grey600} size={14} />
    </div>
  );
}

const chevronMap = {
  up: BsChevronUp,
  down: BsChevronDown,
};
