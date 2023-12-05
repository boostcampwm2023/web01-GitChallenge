import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { CommandService } from '../command/command.service';

@Injectable()
export class Magic {
  constructor(
    private commandService: CommandService,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  async isDirectoryExist(container: string, path: string): Promise<boolean> {
    const { stdoutData } = await this.commandService.executeCommand(
      `docker exec -w /home/quizzer/quiz/ -u quizzer ${container} ls -la | grep '^d.* ${path}$'`,
    );

    return stdoutData !== '';
  }

  async isFileExist(container: string, path: string): Promise<boolean> {
    const { stdoutData } = await this.commandService.executeCommand(
      `docker exec -w /home/quizzer/quiz/ -u quizzer ${container} ls | grep '^${path}$'`,
    );

    return stdoutData !== '';
  }

  async isBranchExist(container: string, branch: string): Promise<boolean> {
    const command = `docker exec -w /home/quizzer/quiz/ -u quizzer ${container} git branch --list '${branch}'`;
    const { stdoutData } = await this.commandService.executeCommand(command);

    return stdoutData.trim() !== '';
  }

  async getConfig(container: string, key: string): Promise<string> {
    const { stdoutData } = await this.commandService.executeCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} git -C /home/quizzer/quiz config user.${key}`,
    );

    return stdoutData.trim();
  }

  async getCachedDiff(container: string): Promise<string> {
    const { stdoutData } = await this.commandService.executeCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} git diff --cached`,
    );

    return stdoutData;
  }

  async getTreeHead(container: string, branch: string): Promise<string> {
    const { stdoutData } = await this.commandService.executeCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git cat-file -p \\\$(git rev-parse ${branch}) | grep tree | awk '{print \\\$2}'"`,
    );

    return stdoutData.trim();
  }

  async getCommitHashByMessage(
    container: string,
    branch: string,
    message: string,
  ): Promise<string> {
    const { stdoutData } = await this.commandService.executeCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git log --grep='^${message}$' --oneline --reverse ${branch} | awk '{print \\\$1}'"`,
    );

    return stdoutData.trim();
  }

  async getHashObject(container: string, filename: string): Promise<string> {
    const { stdoutData } = await this.commandService.executeCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git hash-object ${filename}"`,
    );

    return stdoutData.trim();
  }

  async getRemotes(container: string): Promise<string> {
    const { stdoutData } = await this.commandService.executeCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git remote -v"`,
    );

    return stdoutData;
  }

  async getNowBranch(container: string): Promise<string> {
    const { stdoutData } = await this.commandService.executeCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git rev-parse --abbrev-ref HEAD"`,
    );

    return stdoutData.trim();
  }

  async getAllBranch(container: string): Promise<string> {
    const { stdoutData } = await this.commandService.executeCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git branch | cut -c 3-"`,
    );

    return stdoutData;
  }

  async getRecentStashPatch(container: string): Promise<string> {
    const { stdoutData } = await this.commandService.executeCommand(
      `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git stash show -p"`,
    );

    return stdoutData;
  }

  async isBranchExistRemote(
    container: string,
    remote: string,
    branch: string,
  ): Promise<boolean> {
    const command = `docker exec  -u quizzer -w /${remote} ${container} git branch --list '${branch}'`;
    const { stdoutData } = await this.commandService.executeCommand(command);

    return stdoutData.trim() !== '';
  }

  async getTreeHeadRemote(
    container: string,
    remote: string,
    branch: string,
  ): Promise<string> {
    const { stdoutData } = await this.commandService.executeCommand(
      `docker exec -u quizzer -w /${remote} ${container} sh -c "git cat-file -p \\\$(git rev-parse ${branch}) | grep tree | awk '{print \\\$2}'"`,
    );

    return stdoutData.trim();
  }
}
