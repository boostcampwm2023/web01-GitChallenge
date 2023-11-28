import { getConfig } from './test.module';

const containerId = process.argv[3];

describe('QuizWizardService', () => {
  it('should be true', async () => {
    expect(await getConfig(containerId, 'name')).not.toMatch('MergeMaster');
    expect(await getConfig(containerId, 'email')).not.toMatch(
      'mergemaster@gitchallenge.com',
    );
  });
});
