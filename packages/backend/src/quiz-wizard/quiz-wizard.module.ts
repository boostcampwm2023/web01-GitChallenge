import { Module } from '@nestjs/common';
import { QuizWizardService } from './quiz-wizard.service';
import { Magic } from './magic';
import { SshModule } from '../ssh/ssh.module';

@Module({
  imports: [SshModule],
  providers: [QuizWizardService, Magic],
  exports: [QuizWizardService],
})
export class QuizWizardModule {}
