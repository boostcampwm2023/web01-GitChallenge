import Link from "next/link";

import * as layout from "../../../tokens/layout.css";
import { Accordion } from "../Accordion";

import { nav } from "./nav";
import * as styles from "./SideBar.css";

export default function SideBar() {
  return (
    <nav className={layout.sideBar}>
      {nav.map((menu) => (
        <Accordion key={menu.title}>
          <Accordion.Details>
            <Accordion.Summary>{menu.title}</Accordion.Summary>
            <ol className={styles.olStyle}>
              {menu.subTitles.map((subTitle) => (
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
          </Accordion.Details>
        </Accordion>
      ))}
    </nav>
  );
}
