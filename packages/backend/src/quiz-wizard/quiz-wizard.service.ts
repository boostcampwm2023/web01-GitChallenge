import { Injectable } from '@nestjs/common';
import { Magic } from './magic';

@Injectable()
export class QuizWizardService {
  constructor(private magic: Magic) {}

  async submit(containerId: string, quizId: number) {
    const checker = this[`checkCondition${quizId}`];
    if (checker) {
      return await checker.call(this, containerId);
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
    if (
      (await this.magic.getTreeHead(containerId, 'dev')) !==
      '4e66c710f89b80ee0424831c0d1257d329d6d1a3'
    )
      return false;

    if ((await this.magic.getNowBranch(containerId)) !== 'main') return false;

    return true;
  }

  async checkCondition7(containerId: string): Promise<boolean> {
    const amendCommitHash = await this.magic.getCommitHashByMessage(
      containerId,
      'feat/somethingB',
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
        'feat/somethingB',
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
        'feat/somethingB',
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

  async checkCondition11(containerId: string): Promise<boolean> {
    if (!(await this.magic.isBranchExist(containerId, 'hotfix/fixA'))) {
      return false;
    }

    if (
      (await this.magic.getRecentStashPatch(containerId)) !==
      `diff --git a/login.js b/login.js
index e69de29..bf5c54f 100644
--- a/login.js
+++ b/login.js
@@ -0,0 +1 @@
+console.log("implementing login")
`
    ) {
      return false;
    }

    if (
      (await this.magic.getTreeHead(containerId, 'hotfix/fixA')) !==
      'bebe52f7d1c8440fb4b1af9aa70ad9523d56336b'
    ) {
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

  async checkCondition13(containerId: string): Promise<boolean> {
    try {
      const messages = [
        '회원탈퇴 기능 구현',
        '로그인 테스트 코드 작성',
        '로그인 기능 구현',
      ];
      const hashes = [
        'ad5fe01b96edeab9ebd213a4069ea9d6f313eec3',
        '64d5e0c4675ca4b51d1e5e66bbcc703bc785308f',
        '86eff1319c698fdd99b9c2289d4f66f0498ca040',
        '3c363aeb69b28b176bf565dba6bb8a3a92d9fd5d',
      ];

      for (const [index, message] of messages.entries()) {
        const commitHash = await this.magic.getCommitHashByMessage(
          containerId,
          'feat/somethingB',
          message,
        );

        if (
          !commitHash ||
          (await this.magic.getTreeHead(containerId, commitHash)) !==
            hashes[index] ||
          (await this.magic.getTreeHead(containerId, `${commitHash}~1`)) !==
            hashes[index + 1]
        ) {
          return false;
        }
      }

      return true;
    } catch {
      return false;
    }
  }

  async checkCondition14(containerId: string): Promise<boolean> {
    if (
      (await this.magic.getTreeHead(containerId, 'main')) !==
      '2f3177d100b90c5a605e97c2fc546502cee2d4a6'
    )
      return false;

    return true;
  }

  async checkCondition15(containerId: string): Promise<boolean> {
    if (
      (await this.magic.getTreeHead(containerId, 'main')) !==
      '13a3ee29a5743442145beffa234ad373548d8c59'
    )
      return false;

    if (
      (await this.magic.getRemotes(containerId)) !==
      `origin	/origin (fetch)
origin	/origin (push)
upstream	/upstream (fetch)
upstream	/upstream (push)
`
    ) {
      return false;
    }

    return true;
  }

  async checkCondition16(containerId: string): Promise<boolean> {
    return (await this.magic.getNowBranch(containerId)) === 'feat/somethingA';
  }

  async checkCondition17(containerId: string): Promise<boolean> {
    return (
      (await this.magic.getTreeHead(containerId, 'main')) ===
      '3bd4e8ab14ecf1c7e1e85262ce241c4275080270'
    );
  }

  async checkCondition18(containerId: string): Promise<boolean> {
    if (
      !(await this.magic.isBranchExistRemote(
        containerId,
        'origin',
        'feat/merge-master',
      ))
    ) {
      return false;
    }

    if (
      (await this.magic.getTreeHeadRemote(
        containerId,
        'origin',
        'feat/merge-master',
      )) !== 'd173eb2b7c6888bf77fce84b191a433f36c47a91'
    ) {
      return false;
    }

    return true;
  }

  async checkCondition19(containerId: string): Promise<boolean> {
    return (
      (await this.magic.getAllBranch(containerId)) ===
      `feat/somethingC
hotfix/somethingD
main
`
    );
  }
}
