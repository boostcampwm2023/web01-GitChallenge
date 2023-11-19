import { AiFillGithub } from "react-icons/ai";

import { footer as footerLayout } from "../../../tokens/layout.css";

import * as styles from "./Footer.css";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={footerLayout}>
        <strong className={styles.teamName}>Merge Masters</strong>
        <div className={styles.content}>
          <div className={styles.teamInfo}>
            <div>Team : Merge Master</div>
            <div>
              Contact :{" "}
              <a
                href="https://github.com/boostcampwm2023/web01-GitChallenge/issues"
                target="_blank"
                className={styles.contact}
              >
                Issues
              </a>
            </div>
          </div>
          <div>
            <a
              href="https://github.com/boostcampwm2023/web01-GitChallenge"
              target="_blank"
              aria-label="GitHub Repository"
            >
              <AiFillGithub size={36} color="black" />
            </a>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.rightsContainer}>
          <span className={styles.rights}>© 2023 All rights reserved</span>
          <span>해당 웹사이트는 Chrome에 최적화되어 있습니다.</span>
        </div>
      </div>
    </footer>
  );
}
