import { executeSSHCommand } from '../../../src/common/ssh.util';
import { DOCKER_TEMPLATE, setupTestingModule } from './quiz-wizard.test.setup';
import { QuizWizardService } from '../quiz-wizard.service';

describe('2번 문제 채점 테스트', () => {
  let service: QuizWizardService, containerId: string;

  beforeEach(async () => {
    ({ service, containerId } = await setupTestingModule(2));
  });

  afterEach(async () => {
    await executeSSHCommand(`docker rm -f ${containerId}`);
  });

  it('베스트 정답 케이스', async () => {
    await executeSSHCommand(
      `${DOCKER_TEMPLATE} ${containerId} git config user.name "Username"`,
      `${DOCKER_TEMPLATE} ${containerId} git config user.email "useremail@email.com"`,
    );

    expect(await service.submit(containerId, 2)).toBe(true);
  });

  it('아무 동작 없는 케이스', async () => {
    expect(await service.submit(containerId, 2)).toBe(false);
  });
});
