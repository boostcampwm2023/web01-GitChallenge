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
    return !(
      (await this.magic.getConfig(containerId, 'name')) === 'MergeMaster' ||
      (await this.magic.getConfig(containerId, 'email')) ===
        'mergemaster@gitchallenge.com'
    );
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
      '2c347f65f96ed5817553d668c062f8bec792131d'
    );
  }

  async checkCondition5(containerId: string): Promise<boolean> {
    return (await this.magic.isBranchExist(containerId, 'dev')) === true;
  }

  async checkCondition6(containerId: string): Promise<boolean> {
    return (await this.magic.isBranchExist(containerId, 'dev')) === true;
  }
}
