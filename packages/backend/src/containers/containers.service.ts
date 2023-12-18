import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import shellEscape from 'shell-escape';
import { v4 as uuidv4 } from 'uuid';
import { ActionType } from '../session/schema/session.schema';
import { CommandService } from '../command/command.service';

const DOCKER_QUIZZER_COMMAND = 'docker exec -w /home/quizzer/quiz/ -u quizzer';
const RETRY_DELAY = 500;
const MAX_RETRY = 3;
const GRAPH_COMMAND = `git log --branches --pretty=format:'%H%n%P%n%s%n%D' --topo-order`;
const GRAPH_ESCAPE = '89BDBC3136461-17189F6963D26-9F1BC6D53A3ED';
const BRANCH_COMMAND = `git rev-parse --is-inside-work-tree &>/dev/null && (git symbolic-ref --short HEAD 2>/dev/null || git rev-parse --short HEAD) || echo ""`;
const BRANCH_ESCAPE = '23ASDF2312-ASDFAS223-ASDF2223';

@Injectable()
export class ContainersService {
  private availableContainers: Map<number, string[]> = new Map();

  constructor(
    private configService: ConfigService,
    @Inject('winston') private readonly logger: Logger,
    private commandService: CommandService,
  ) {
    if (this.configService.get<string>('SERVER_MODE') !== 'dev') {
      this.commandService.executeCommand('docker rm -f $(docker ps -a -q)');
      this.initializeContainers();
    }
  }

  async initializeContainers() {
    for (let i: number = 1; i < 20; i++) {
      const maxContainers =
        this.configService.get<number>('CONTAINER_POOL_MAX') || 1;
      const containers = [];

      for (let j = 0; j < maxContainers; j++) {
        const containerId = await this.createContainer(i);
        containers.push(containerId);
      }

      this.availableContainers.set(i, containers);
    }
  }

  private getGitCommand(container: string, command: string): string {
    return `${DOCKER_QUIZZER_COMMAND} ${container} ${command}`;
  }
  async runGitCommand(
    container: string,
    command: string,
  ): Promise<{ message: string; result: string; graph?: string; ref: string }> {
    let { stdoutData, stderrData } = await this.commandService.executeCommand(
      this.getGitCommand(container, command),
      `${DOCKER_QUIZZER_COMMAND} ${container} sh -c "echo ${GRAPH_ESCAPE} 1>&2; echo ${GRAPH_ESCAPE}; ${GRAPH_COMMAND}; echo ${BRANCH_ESCAPE} 1>&2; echo ${BRANCH_ESCAPE}; ${BRANCH_COMMAND}"`,
    );

    const graphMessage = stdoutData
      .slice(
        stdoutData.indexOf(GRAPH_ESCAPE) + GRAPH_ESCAPE.length,
        stdoutData.indexOf(BRANCH_ESCAPE),
      )
      .trim();

    const branchMessage = stdoutData
      .slice(stdoutData.indexOf(BRANCH_ESCAPE) + BRANCH_ESCAPE.length)
      .trim();

    stdoutData = stdoutData.slice(0, stdoutData.indexOf(GRAPH_ESCAPE));
    stderrData = stderrData.slice(0, stderrData.indexOf(GRAPH_ESCAPE));

    const patternIndex = stdoutData.indexOf('# CREATED_BY_OUTPUT.SH\n');
    if (patternIndex !== -1) {
      const message = stdoutData.slice(0, patternIndex);
      return {
        message,
        result: 'editor',
        graph: graphMessage,
        ref: branchMessage,
      };
    }

    if (stderrData) {
      return {
        message: stderrData,
        result: 'fail',
        graph: graphMessage,
        ref: branchMessage,
      };
    }

    return {
      message: stdoutData,
      result: 'success',
      graph: graphMessage,
      ref: branchMessage,
    };
  }

  private buildEditorCommand(message: string, command: string) {
    const escapedMessage = shellEscape([message]);

    return `git config --global core.editor /editor/input.sh; echo ${escapedMessage} | ${command}; git config --global core.editor /editor/output.sh`;
  }

  async runEditorCommand(
    container: string,
    command: string,
    message: string,
  ): Promise<{ message: string; result: string; graph: string; ref: string }> {
    let { stdoutData, stderrData } = await this.commandService.executeCommand(
      `${DOCKER_QUIZZER_COMMAND} ${container} sh -c "${this.buildEditorCommand(
        message,
        command,
      )}; echo ${GRAPH_ESCAPE} 1>&2; echo ${GRAPH_ESCAPE}; ${GRAPH_COMMAND}; echo ${BRANCH_ESCAPE} 1>&2; echo ${BRANCH_ESCAPE}; ${BRANCH_COMMAND}"`,
    );

    const graphMessage = stdoutData
      .slice(
        stdoutData.indexOf(GRAPH_ESCAPE) + GRAPH_ESCAPE.length,
        stdoutData.indexOf(BRANCH_ESCAPE),
      )
      .trim();

    const branchMessage = stdoutData
      .slice(stdoutData.indexOf(BRANCH_ESCAPE) + BRANCH_ESCAPE.length)
      .trim();

    stdoutData = stdoutData.slice(0, stdoutData.indexOf(GRAPH_ESCAPE));
    stderrData = stderrData.slice(0, stderrData.indexOf(GRAPH_ESCAPE));

    if (stderrData) {
      return {
        message: stderrData,
        result: 'fail',
        graph: graphMessage,
        ref: branchMessage,
      };
    }

    return {
      message: stdoutData,
      result: 'success',
      graph: graphMessage,
      ref: branchMessage,
    };
  }

  async createContainer(quizId: number): Promise<string> {
    const user: string = this.configService.get<string>(
      'CONTAINER_GIT_USERNAME',
    );

    const containerId = uuidv4();

    const createContainerCommand = `docker run -itd --network none -v ~/editor:/editor \
--name ${containerId} mergemasters/alpine-git:0.2 /bin/sh`;
    const copyFilesCommand = `docker cp ~/quizzes/${quizId}/. ${containerId}:/home/${user}/quiz/`;
    const copyOriginCommand = `[ -d ~/origins/${quizId} ] && docker cp ~/origins/${quizId}/. ${containerId}:/origin/`;
    const copyUpstreamCommand = `[ -d ~/upstreams/${quizId} ] && docker cp ~/upstreams/${quizId}/. ${containerId}:/upstream/`;
    const chownCommand = `docker exec -u root ${containerId} chown -R ${user}:${user} /home/${user}`;
    const chownOriginCommand = `[ -d ~/origins/${quizId} ] && docker exec -u root ${containerId} chown -R ${user}:${user} /origin`;
    const chownUpstreamCommand = `[ -d ~/upstreams/${quizId} ] && docker exec -u root ${containerId} chown -R ${user}:${user} /remote`;
    const coreEditorCommand = `docker exec -w /home/quizzer/quiz/ -u ${user} ${containerId} git config --global core.editor /editor/output.sh`;
    const mainBranchCommand = `docker exec -w /home/quizzer/quiz/ -u ${user} ${containerId} git config --global init.defaultbranch main`;
    await this.commandService.executeCommand(
      createContainerCommand,
      copyFilesCommand,
      copyOriginCommand,
      copyUpstreamCommand,
      chownCommand,
      chownOriginCommand,
      chownUpstreamCommand,
      coreEditorCommand,
      mainBranchCommand,
    );

    return containerId;
  }

  async getContainer(
    quizIdParam: number | string,
    retry = MAX_RETRY,
  ): Promise<string> {
    const quizId =
      typeof quizIdParam === 'string' ? parseInt(quizIdParam, 10) : quizIdParam;

    if (this.configService.get<string>('SERVER_MODE') === 'dev') {
      return this.createContainer(quizId);
    }

    if (this.availableContainers.get(quizId).length > 0) {
      const containerId = this.availableContainers.get(quizId).shift();

      this.commandService.executeCron(
        `(sleep 1800; docker rm -f ${containerId} >/dev/null 2>&1) &`,
      );

      this.createContainer(quizId).then((containerId) => {
        this.availableContainers.get(quizId).push(containerId);
      });

      if (!(await this.isValidateContainerId(containerId))) {
        return await this.createContainer(quizId);
      }

      return containerId;
    }

    if (retry <= 0) {
      throw new Error('No available containers after maximum retries');
    }

    // 재시도 로직
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const containerId = await this.getContainer(quizId, retry - 1);
          resolve(containerId);
        } catch (error) {
          reject(error);
        }
      }, RETRY_DELAY);
    });
  }

  async isValidateContainerId(containerId: string): Promise<boolean> {
    const command = `docker ps -a --filter "name=${containerId}" --format "{{.ID}}"`;

    const { stdoutData, stderrData } =
      await this.commandService.executeCommand(command);

    if (stderrData) {
      // 도커 미설치 등의 에러일 듯
      throw new Error(stderrData);
    }

    return stdoutData.trim() !== '';
  }

  async deleteContainer(containerId: string): Promise<void> {
    const command = `docker rm -f ${containerId}`;

    const { stdoutData, stderrData } =
      await this.commandService.executeCommand(command);

    this.logger.log('info', `container deleted : ${stdoutData.trim()}`);
    this.logger.log('info', `container deleted error : ${stderrData.trim()}`);
  }

  private buildDockerCommand(container: string, ...commands: string[]): string {
    const command = commands.join('; ');
    return `${DOCKER_QUIZZER_COMMAND} ${container} sh -c "${command}"`;
  }

  async restoreContainer(logObject: {
    status: string;
    logs: {
      mode: ActionType;
      message: string;
    }[];
    containerId: string;
  }): Promise<void> {
    this.logger.log('info', 'restoring container...');
    const { logs, containerId } = logObject;

    let recentMessage = '';

    const commands: string[] = logs.map((log) => {
      if (log.mode === 'command') {
        recentMessage = log.message;
        return log.message;
      } else if (log.mode === 'editor') {
        return this.buildEditorCommand(log.message, recentMessage);
      } else {
        throw new Error('Invalid log mode');
      }
    });

    await this.commandService.executeCommand(
      this.buildDockerCommand(containerId, ...commands),
    );
  }
}
