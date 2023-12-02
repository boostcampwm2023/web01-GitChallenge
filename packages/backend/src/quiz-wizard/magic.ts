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
      `docker exec -w /home/quizzer/quiz/ -u quizzer ${container} ls -la | grep '^d.* ${path}$'`,
    );

    return stdoutData !== '';
  }

  async isFileExist(container: string, path: string): Promise<boolean> {
    const { stdoutData } = await this.sshService.executeSSHCommand(
      `docker exec -w /home/quizzer/quiz/ -u quizzer ${container} ls | grep '^${path}$'`,
    );

    return stdoutData !== '';
  }

  async isBranchExist(container: string, branch: string): Promise<boolean> {
    const command = `docker exec -w /home/quizzer/quiz/ -u quizzer ${container} git branch --list '${branch}'`;
    const { stdoutData } = await this.sshService.executeSSHCommand(command);

    return stdoutData !== '';
  }

  async getConfig(container: string, key: string): Promise<string> {
    const { stdoutData } = await this.sshService.executeSSHCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} git -C /home/quizzer/quiz config user.${key}`,
    );

    return stdoutData.trim();
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

    return stdoutData.trim();
  }

  async getCommitHashByMessage(
    container: string,
    branch: string,
    message: string,
  ): Promise<string> {
    const { stdoutData } = await this.sshService.executeSSHCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git log --grep='^${message}$' --oneline --reverse ${branch} | awk '{print \\\$1}'"`,
    );

    return stdoutData.trim();
  }

  async getHashObject(container: string, filename: string): Promise<string> {
    const { stdoutData } = await this.sshService.executeSSHCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git hash-object ${filename}"`,
    );

    return stdoutData.trim();
  }

  async getRemotes(container: string): Promise<string> {
    const { stdoutData } = await this.sshService.executeSSHCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git remote -v"`,
    );

    return stdoutData;
  }

  async getNowBranch(container: string): Promise<string> {
    const { stdoutData } = await this.sshService.executeSSHCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git rev-parse --abbrev-ref HEAD"`,
    );

    return stdoutData.trim();
  }
}
