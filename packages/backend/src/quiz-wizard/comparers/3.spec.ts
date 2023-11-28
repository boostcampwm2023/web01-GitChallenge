import { getCachedDiff } from './test.module';

const containerId = process.argv[3];

describe('QuizWizardService', () => {
  it('should be true', async () => {
    expect(await getCachedDiff(containerId))
      .toMatch(`diff --git a/README.md b/README.md
new file mode 100644
index 0000000..e69de29
diff --git a/docs/plan.md b/docs/plan.md
index e69de29..3b18e51 100644
--- a/docs/plan.md
+++ b/docs/plan.md
@@ -0,0 +1 @@
+hello world
`);
  });
});
