import { getTreeHead } from './test.module';

const containerId = process.argv[3];

describe('QuizWizardService', () => {
  it('should be true', async () => {
    expect(await getTreeHead(containerId, 'main')).toMatch(
      '2c347f65f96ed5817553d668c062f8bec792131d',
    );
  });
});
