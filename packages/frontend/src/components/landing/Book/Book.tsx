/* eslint-disable */

import Image from "next/image";
import Link from "next/link";

import useScrollFadeIn from "../../../hooks/useScroll/useScrollFadeIn";
import { toCodeTag } from "../../../utils/mapper";

import * as styles from "./Book.css";
import { data } from "./data";

export default function Book() {
  const thresholds = [0.1, 0.5, 0.5, 0.1];

  return (
    <section>
      {data.map((item, index) => (
        <div
          key={item.title}
          className={styles.container}
          {...useScrollFadeIn("up", 1000, 200, thresholds[index])}
        >
          <h2 className={styles.h1}>{item.title}</h2>
          {item.description && (
            <div className={styles.description}>{item.description}</div>
          )}
          {item.subItems &&
            item.subItems.map((list) => (
              <>
                <h3
                  className={styles.h2}
                  dangerouslySetInnerHTML={{ __html: toCodeTag(list.subtitle) }}
                />
                <ul>
                  {list.listItems.map((listItem) => (
                    <li
                      className={styles.li}
                      key={listItem}
                      dangerouslySetInnerHTML={{
                        __html: toCodeTag(listItem),
                      }}
                    />
                  ))}
                </ul>
              </>
            ))}
          {item.link && (
            <div className={styles.linkWrapper}>
              <Link href={item.link.href}>{item.link.label}</Link>
              <Image
                width={23}
                height={23}
                src={item.link.image}
                alt={item.link.image}
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
