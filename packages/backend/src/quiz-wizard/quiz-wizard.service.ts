import { Injectable } from '@nestjs/common';
import { Magic } from './magic';

@Injectable()
export class QuizWizardService {
  constructor(private magic: Magic) {}

  private conditionCheckers = {
    1: (containerId: string) => this.checkCondition1(containerId),
    2: (containerId: string) => this.checkCondition2(containerId),
    3: (containerId: string) => this.checkCondition3(containerId),
    4: (containerId: string) => this.checkCondition4(containerId),
    5: (containerId: string) => this.checkCondition5(containerId),
    6: (containerId: string) => this.checkCondition6(containerId),
    7: (containerId: string) => this.checkCondition7(containerId),
    8: (containerId: string) => this.checkCondition8(containerId),
    9: (containerId: string) => this.checkCondition9(containerId),
    10: (containerId: string) => this.checkCondition10(containerId),
    12: (containerId: string) => this.checkCondition12(containerId),
  };

  async submit(containerId: string, quizId: number) {
    const checker = this.conditionCheckers[quizId];
    if (checker) {
      return await checker(containerId);
    }
    return false;
  }

  async checkCondition1(containerId: string): Promise<boolean> {
    return await this.magic.isDirectoryExist(containerId, '.git');
  }

  async checkCondition2(containerId: string): Promise<boolean> {
    if ((await this.magic.getConfig(containerId, 'name')) === 'MergeMaster')
      return false;
    if (
      (await this.magic.getConfig(containerId, 'email')) ===
      'mergemaster@gitchallenge.com'
    )
      return false;

    return true;
  }

  async checkCondition3(containerId: string): Promise<boolean> {
    return (
      (await this.magic.getCachedDiff(containerId)) ===
      `diff --git a/README.md b/README.md
new file mode 100644
index 0000000..e69de29
diff --git a/docs/plan.md b/docs/plan.md
index e69de29..3b18e51 100644
--- a/docs/plan.md
+++ b/docs/plan.md
@@ -0,0 +1 @@
+hello world
`
    );
  }

  async checkCondition4(containerId: string): Promise<boolean> {
    return (
      (await this.magic.getTreeHead(containerId, 'main')) ===
      '2d9c4be41cfcd733671742229782ff0ee390cce3'
    );
  }

  async checkCondition5(containerId: string): Promise<boolean> {
    return (await this.magic.isBranchExist(containerId, 'dev')) === true;
  }

  async checkCondition6(containerId: string): Promise<boolean> {
    return (await this.magic.isBranchExist(containerId, 'dev')) === true;
  }

  async checkCondition7(containerId: string): Promise<boolean> {
    const amendCommitHash = await this.magic.getCommitHashByMessage(
      containerId,
      '회원가입 기능 구현',
    );
    if (
      !amendCommitHash ||
      (await this.magic.getTreeHead(containerId, amendCommitHash)) !==
        '3c363aeb69b28b176bf565dba6bb8a3a92d9fd5d'
    ) {
      return false;
    }

    if (
      (await this.magic.getTreeHead(containerId, `${amendCommitHash}~1`)) !==
      'bebe52f7d1c8440fb4b1af9aa70ad9523d56336b'
    ) {
      return false;
    }

    return true;
  }

  async checkCondition8(containerId: string): Promise<boolean> {
    try {
      const commitHash = await this.magic.getCommitHashByMessage(
        containerId,
        '회원가입 테스트 코드 작성',
      );
      if (
        !commitHash ||
        (await this.magic.getTreeHead(containerId, commitHash)) !==
          '3c363aeb69b28b176bf565dba6bb8a3a92d9fd5d'
      ) {
        return false;
      }

      if (
        (await this.magic.getTreeHead(containerId, `${commitHash}~1`)) !==
        'eeee188ee95190bf884e106326de84f1051b9ea1'
      ) {
        return false;
      }

      if (
        (await this.magic.getTreeHead(containerId, `${commitHash}~2`)) !==
        'bebe52f7d1c8440fb4b1af9aa70ad9523d56336b'
      ) {
        return false;
      }

      const commitHashSecond = await this.magic.getCommitHashByMessage(
        containerId,
        '회원가입 기능 구현',
      );
      if (
        (await this.magic.getTreeHead(containerId, `${commitHashSecond}`)) !==
        'eeee188ee95190bf884e106326de84f1051b9ea1'
      ) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  async checkCondition9(containerId: string): Promise<boolean> {
    return (
      (await this.magic.getHashObject(containerId, 'important.js')) ===
      'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391'
    );
  }

  async checkCondition10(containerId: string): Promise<boolean> {
    if (await this.magic.isFileExist(containerId, 'tmp.js')) {
      return false;
    }
    if (await this.magic.isFileExist(containerId, 'tmptmp.js')) {
      return false;
    }
    if (await this.magic.isFileExist(containerId, 'tmptmptmp.js')) {
      return false;
    }

    return true;
  }

  async checkCondition12(containerId: string): Promise<boolean> {
    if (
      (await this.magic.getTreeHead(containerId, 'main')) !==
      'b9671d4553366d5609ae74fcc11f9f737fc859bd'
    ) {
      return false;
    }

    if (
      (await this.magic.getTreeHead(containerId, 'hotfix/fixA')) !==
      'b9671d4553366d5609ae74fcc11f9f737fc859bd'
    ) {
      return false;
    }

    if (
      (await this.magic.getTreeHead(containerId, 'feat/somethingB')) !==
      '3c363aeb69b28b176bf565dba6bb8a3a92d9fd5d'
    ) {
      return false;
    }

    return true;
  }
}
