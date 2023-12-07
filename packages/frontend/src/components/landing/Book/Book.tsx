import Image from "next/image";
import Link from "next/link";

import { toCodeTag } from "../../../utils/mapper";

import * as styles from "./Book.css";
import { data } from "./data";

export default function Book() {
  return (
    <section>
      {data.map((item) => (
        <div key={item.title} className={styles.container}>
          <h1 className={styles.h1}>{item.title}</h1>
          {item.description && (
            <div className={styles.description}>{item.description}</div>
          )}
          {item.subItems &&
            item.subItems.map((list) => (
              <>
                <h2
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
