import { executeSSHCommand } from '../../../src/common/ssh.util';
import { DOCKER_TEMPLATE, setupTestingModule } from './quiz-wizard.test.setup';
import { QuizWizardService } from '../quiz-wizard.service';

describe('1번 문제 채점 테스트', () => {
  let service: QuizWizardService, containerId: string;

  beforeEach(async () => {
    ({ service, containerId } = await setupTestingModule(1));
  });

  afterEach(async () => {
    await executeSSHCommand(`docker rm -f ${containerId}`);
  });

  it('init 이후 정답 받는 경우', async () => {
    await executeSSHCommand(`${DOCKER_TEMPLATE} ${containerId} git init`);

    expect(await service.submit(containerId, 1)).toBe(true);
  });

  it('init 하지 않은 경우', async () => {
    expect(await service.submit(containerId, 1)).toBe(false);
  });
});
