import {
  Accordion,
  BadgeGroup,
} from "../../../design-system/components/common";

import badgeGroupLayout from "./CommandAccordion.css";

interface CommandAccordionProps {
  width?: number | string;
  items: string[];
}

export default function CommandAccordion({
  width = "100%",
  items,
}: CommandAccordionProps) {
  return (
    <Accordion width={width}>
      <Accordion.Details>
        <Accordion.Summary color="grey" size="sm">
          {({ open }) => <>핵심명령어 {open ? "숨기기" : "보기"}</>}
        </Accordion.Summary>
        <div className={badgeGroupLayout}>
          <BadgeGroup items={items.map(toLabelProps)} />
        </div>
      </Accordion.Details>
    </Accordion>
  );
}

function toLabelProps(item: string) {
  return { label: item };
}
