import Book from "./Book/Book";
import * as styles from "./Landing.css";
import ServiceInfo from "./ServiceInfo/ServiceInfo";

export default function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.sectionWrapper}>
        <ServiceInfo />
        <Book />
      </div>
    </div>
  );
}
