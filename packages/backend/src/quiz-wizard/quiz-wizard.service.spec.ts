import { Test, TestingModule } from '@nestjs/testing';
import { QuizWizardService } from './quiz-wizard.service';
import { ContainersService } from '../containers/containers.service';
import { executeSSHCommand } from '../common/ssh.util';
import { ConfigService } from '@nestjs/config';

const DOCKER_TEMPLATE = 'docker exec -w /home/quizzer/quiz -u quizzer';

const mockConfigService = {
  get: jest.fn((key) => {
    if (key === 'CONTAINER_GIT_USERNAME') {
      return 'quizzer';
    }
  }),
};
const mockLogger = {};

describe('QuizWizardService', () => {
  let service: QuizWizardService;
  let containerService: ContainersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizWizardService,
        ContainersService,
        ContainersService,
        {
          provide: ConfigService,
          useValue: mockConfigService, // 여기서 mockConfigService는 모킹된 ConfigService
        },
        {
          provide: 'winston',
          useValue: mockLogger, // 여기서 mockLogger는 모킹된 Logger
        },
      ],
    }).compile();

    service = module.get<QuizWizardService>(QuizWizardService);
    containerService = module.get<ContainersService>(ContainersService);
  });

  describe('1번 문제 채점 테스트 코드', () => {
    let containerId: string;

    beforeEach(async () => {
      containerId = await containerService.getContainer(1);
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

  describe('2번 문제 채점 테스트 코드', () => {
    let containerId: string;

    beforeEach(async () => {
      containerId = await containerService.getContainer(2);
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
});
