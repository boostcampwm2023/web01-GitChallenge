import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

@Injectable()
export class QuizWizardService {
  async submit(containerId, quizId) {
    const execAsync = promisify(exec);

    try {
      await execAsync(
        `yarn run jest ${path.resolve(
          process.cwd(),
          'src',
          'quiz-wizard',
          'tests',
          `${quizId}.spec.ts`,
        )} ${containerId}`,
      );
      return true;
    } catch (e) {
      return false;
    }
  }
}
