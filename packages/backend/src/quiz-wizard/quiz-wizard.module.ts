import { Module } from '@nestjs/common';
import { QuizWizardService } from './quiz-wizard.service';

@Module({
  providers: [QuizWizardService],
  exports: [QuizWizardService],
})
export class QuizWizardModule {}
