import { Inject, Injectable } from '@nestjs/common';
import { SshService } from '../ssh/ssh.service';
import { Logger } from 'winston';

@Injectable()
export class Magic {
  constructor(
    private sshService: SshService,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  async isDirectoryExist(container: string, path: string): Promise<boolean> {
    const { stdoutData } = await this.sshService.executeSSHCommand(
      `docker exec -w /home/quizzer/quiz/ -u quizzer ${container} ls -l ${path} | grep ^d`,
    );

    return stdoutData !== '';
  }

  async isBranchExist(container: string, branch: string): Promise<boolean> {
    const command = `docker exec -w /home/quizzer/quiz/ -u quizzer ${container} git branch --list '${branch}'`;
    this.logger.log('info', command);
    const { stdoutData } = await this.sshService.executeSSHCommand(command);

    return stdoutData !== '';
  }

  async getConfig(container: string, key: string): Promise<string> {
    const { stdoutData } = await this.sshService.executeSSHCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} git -C /home/quizzer/quiz config user.${key}`,
    );

    return stdoutData;
  }

  async getCachedDiff(container: string): Promise<string> {
    const { stdoutData } = await this.sshService.executeSSHCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} git diff --cached`,
    );

    return stdoutData;
  }

  async getTreeHead(container: string, branch: string): Promise<string> {
    const { stdoutData } = await this.sshService.executeSSHCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git cat-file -p \\\$(git rev-parse ${branch}) | grep tree | awk '{print \\\$2}'"`,
    );

    return stdoutData;
  }
}
