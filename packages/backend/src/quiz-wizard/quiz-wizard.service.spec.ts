import { Test, TestingModule } from '@nestjs/testing';
import { QuizWizardService } from './quiz-wizard.service';

describe('QuizWizardService', () => {
  let service: QuizWizardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizWizardService],
    }).compile();

    service = module.get<QuizWizardService>(QuizWizardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
