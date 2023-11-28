import { isDirectoryExist } from './test.module';

const containerId = process.argv[3];

describe('QuizWizardService', () => {
  it('should be true', async () => {
    expect(await isDirectoryExist(containerId, '.git')).toBe(true);
  });
});
