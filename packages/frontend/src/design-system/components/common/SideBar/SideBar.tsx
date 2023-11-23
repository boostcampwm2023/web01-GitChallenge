import Link from "next/link";

import * as layout from "../../../tokens/layout.css";
import { Accordion } from "../Accordion";

import { sidebarNavigation } from "./nav";
import * as styles from "./SideBar.css";

export default function SideBar() {
  return (
    <nav className={layout.sideBar}>
      {sidebarNavigation.map((item) => (
        <Accordion key={item.title} open>
          <Accordion.Details>
            <Accordion.Summary>{item.title}</Accordion.Summary>
            <SubItems subItems={item.subItems} />
          </Accordion.Details>
        </Accordion>
      ))}
    </nav>
  );
}

interface SubItemsProps {
  subTitle: string;
  href: string;
}

function SubItems({ subItems }: { subItems: SubItemsProps[] }) {
  return (
    <ol className={styles.olStyle}>
      {subItems.map((subTitle) => (
        <li
          className={styles.liStyle}
          key={[subTitle.subTitle, subTitle.href].join("")}
        >
          <Link href={subTitle.href} className={styles.aStyle}>
            {subTitle.subTitle}
          </Link>
        </li>
      ))}
    </ol>
  );
}
