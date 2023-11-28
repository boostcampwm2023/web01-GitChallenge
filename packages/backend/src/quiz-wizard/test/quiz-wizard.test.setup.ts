import { Test, TestingModule } from '@nestjs/testing';
import { QuizWizardService } from '../quiz-wizard.service';
import { ContainersService } from '../../containers/containers.service';
import { ConfigService } from '@nestjs/config';

export const DOCKER_TEMPLATE = 'docker exec -w /home/quizzer/quiz -u quizzer';

const mockConfigService = {
  get: jest.fn((key) => {
    if (key === 'CONTAINER_GIT_USERNAME') {
      return 'quizzer';
    }
  }),
};
const mockLogger = {};

export const setupTestingModule = async (quizId: number) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      QuizWizardService,
      ContainersService,
      ContainersService,
      {
        provide: ConfigService,
        useValue: mockConfigService,
      },
      {
        provide: 'winston',
        useValue: mockLogger,
      },
    ],
  }).compile();

  const service = module.get<QuizWizardService>(QuizWizardService);
  const containerService = module.get<ContainersService>(ContainersService);
  const containerId = await containerService.getContainer(quizId);

  return { service, containerService, containerId };
};
