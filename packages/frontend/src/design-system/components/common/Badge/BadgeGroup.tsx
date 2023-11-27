import { objectKeys } from "../../../../utils/types";

import { Badge } from "./Badge";
import * as styles from "./Badge.css";

const variants = objectKeys(styles.badgeVariants);
export interface BadgeGroupProps {
  items: { label: string }[];
}

export function BadgeGroup({ items }: BadgeGroupProps) {
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <Badge
          variant={variants[index % variants.length]}
          label={item.label}
          key={item.label}
        />
      ))}
    </div>
  );
}
