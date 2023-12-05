import { Module } from '@nestjs/common';
import { QuizWizardService } from './quiz-wizard.service';
import { Magic } from './magic';
import { CommandModule } from '../command/command.module';

@Module({
  imports: [CommandModule],
  providers: [QuizWizardService, Magic],
  exports: [QuizWizardService],
})
export class QuizWizardModule {}
