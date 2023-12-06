import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "../../../design-system/components/common";
import { flex } from "../../../design-system/tokens/utils.css";

import * as styles from "./ServiceInfo.css";

export default function ServiceInfo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={styles.serviceInfoContainer}>
      <h1 className={mounted ? styles.fadeIn : styles.fadeOut}>
        <span className="highlight">Git</span>
        {`이 너무 어렵게만\n느껴진다면?`}
        <Image
          src="/folder.svg"
          alt="folder-icon"
          width={52}
          height={41}
          className={styles.folderImg}
        />
      </h1>
      <div className={styles.serviceInfo}>
        {[
          "안녕하세요! 저희는 팀 MergeMasters입니다. (만든 이들 : 박용준, 박정제, 박유현, 윤채현)",
          "Git Challenge는 Git에 대한 문제를 실제 상황처럼 구현된 환경에서 학습할 수 있는 서비스입니다.",
          "실제 프로젝트나 시나리오에서 발생할 수 있는 다양한 상황들을 경험하고 실전에서 해결할 수 있도록 도움을 드리는 것을 목표로 하고 있습니다.",
        ].join("\n")}
        <p className={flex}>
          다른 문의 및 개선요청 사항이 있다면
          <Link
            className={styles.issueLink}
            href="https://github.com/boostcampwm2023/web01-GitChallenge/issues"
          >
            <Image
              src="/github.svg"
              width={18}
              height={18}
              alt="github-image"
            />
            깃허브 이슈란
          </Link>
          또는 dbscogus4467@naver.com 으로 문의주세요 🙋🏻‍♀️
        </p>
        <Button
          variant="primaryFill"
          className={styles.problemPageButton}
          onClick={() => {}}
        >
          바로 문제 풀어보러 가기 💻
        </Button>
      </div>
    </section>
  );
}
