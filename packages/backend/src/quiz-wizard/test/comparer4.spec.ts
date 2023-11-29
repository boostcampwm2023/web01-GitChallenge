import { executeSSHCommand } from '../../common/ssh.util';
import { DOCKER_TEMPLATE, setupTestingModule } from './quiz-wizard.test.setup';
import { QuizWizardService } from '../quiz-wizard.service';

describe('4번 문제 채점 테스트', () => {
  let service: QuizWizardService, containerId: string;

  beforeEach(async () => {
    ({ service, containerId } = await setupTestingModule(4));
  });

  afterEach(async () => {
    await executeSSHCommand(`docker rm -f ${containerId}`);
  });

  it('베스트 정답 케이스', async () => {
    await executeSSHCommand(
      `${DOCKER_TEMPLATE} ${containerId} git commit -m "test commit"`,
    );

    expect(await service.submit(containerId, 4)).toBe(true);
  });

  it('전부 다 commit한 케이스', async () => {
    await executeSSHCommand(
      `${DOCKER_TEMPLATE} ${containerId} git add .`,
      `${DOCKER_TEMPLATE} ${containerId} git commit -m "test commit"`,
    );

    expect(await service.submit(containerId, 4)).toBe(false);
  });
});
