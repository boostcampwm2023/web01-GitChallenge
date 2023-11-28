import { executeSSHCommand } from '../../../src/common/ssh.util';
import { DOCKER_TEMPLATE, setupTestingModule } from './quiz-wizard.test.setup';
import { QuizWizardService } from '../quiz-wizard.service';

describe('3번 문제 채점 테스트', () => {
  let service: QuizWizardService, containerId: string;

  beforeEach(async () => {
    ({ service, containerId } = await setupTestingModule(3));
  });

  afterEach(async () => {
    await executeSSHCommand(`docker rm -f ${containerId}`);
  });

  it('베스트 정답 케이스', async () => {
    await executeSSHCommand(
      `${DOCKER_TEMPLATE} ${containerId} git add README.md docs/plan.md`,
    );

    expect(await service.submit(containerId, 3)).toBe(true);
  });

  it('전부 다 add한 케이스', async () => {
    await executeSSHCommand(
      `${DOCKER_TEMPLATE} ${containerId} git add README.md docs/plan.md docs/architecture.md`,
    );

    expect(await service.submit(containerId, 3)).toBe(false);
  });
});
