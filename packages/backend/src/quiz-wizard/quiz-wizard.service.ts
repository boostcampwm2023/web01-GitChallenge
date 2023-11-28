import { Injectable } from '@nestjs/common';
import fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

@Injectable()
export class QuizWizardService {
  async submit(containerId, quizId) {
    const execAsync = promisify(exec);

    console.log('현재 디렉토리 위치:', process.cwd());
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
  checkDirectoryExists(directoryPath) {
    const doesExist = fs.existsSync(directoryPath);
    describe('Directory Existence Check', () => {
      it('should check if a directory exists', () => {
        expect(doesExist).toBe(true);
      });
    });
  }
}
