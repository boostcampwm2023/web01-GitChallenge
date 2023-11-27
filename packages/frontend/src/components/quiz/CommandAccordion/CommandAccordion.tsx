import Link from "next/link";

import { Accordion, Badge } from "../../../design-system/components/common";
import { badgeVariants } from "../../../design-system/components/common/Badge/Badge.css";
import { objectKeys } from "../../../utils/types";

import badgeGroupLayout from "./CommandAccordion.css";

interface CommandAccordionProps {
  width?: number | string;
  items: string[];
}


export default function CommandAccordion({
  width = "100%",
    items,
}: CommandAccordionProps) {  const variants = objectKeys(badgeVariants);
  const gitBookURL = "https://git-scm.com/docs/git";
  return (
    <Accordion width={width}>
      <Accordion.Details>
        <Accordion.Summary color="grey" size="sm">
          {({ open }) => <>핵심명령어 {open ? "숨기기" : "보기"}</>}
        </Accordion.Summary>
        <div className={badgeGroupLayout}>
          {items.map((item, index) => (
            <Badge key={item} variant={variants[index % items.length]}>
              <Link href={`${gitBookURL}-${item}`}>{item}</Link>
            </Badge>
          ))}
        </div>
      </Accordion.Details>
    </Accordion>
  );
}
