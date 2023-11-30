import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { CommandResponseDto } from '../quizzes/dto/command-response.dto';
import shellEscape from 'shell-escape';
import { v4 as uuidv4 } from 'uuid';
import { SshService } from '../ssh/ssh.service';
import { ActionType } from '../session/schema/session.schema';

@Injectable()
export class ContainersService {
  constructor(
    private configService: ConfigService,
    @Inject('winston') private readonly logger: Logger,
    private sshService: SshService,
  ) {}

  async runGitCommand(
    container: string,
    command: string,
  ): Promise<CommandResponseDto> {
    const { stdoutData, stderrData } = await this.sshService.executeSSHCommand(
      `docker exec -w /home/quizzer/quiz/ -u quizzer ${container} /usr/local/bin/restricted-shell ${command}`,
    );

    if (stdoutData.endsWith('# CREATED_BY_OUTPUT.SH\n')) {
      return {
        message: stdoutData.slice(0, -'# CREATED_BY_OUTPUT.SH\n'.length),
        result: 'editor',
      };
    }

    if (stderrData) {
      return { message: stderrData, result: 'fail' };
    }

    return { message: stdoutData, result: 'success' };
  }

  async runEditorCommand(
    container: string,
    command: string,
    message: string,
  ): Promise<CommandResponseDto> {
    const escapedMessage = shellEscape([message]);

    const { stdoutData, stderrData } = await this.sshService.executeSSHCommand(
      `docker exec -w /home/quizzer/quiz/ -u quizzer ${container} sh -c "git config --global core.editor /editor/input.sh && echo ${escapedMessage} | ${command}; git config --global core.editor /editor/output.sh"`,
    );

    if (stderrData) {
      return { message: stderrData, result: 'fail' };
    }

    return { message: stdoutData, result: 'success' };
  }

  async getContainer(quizId: number): Promise<string> {
    // 일단은 컨테이너를 생성해 준다.
    // 차후에는 준비된 컨테이너 중 하나를 선택해서 준다.
    // quizId에 대한 유효성 검사는 이미 끝났다(이미 여기서는 DB 접근 불가)

    const user: string = this.configService.get<string>(
      'CONTAINER_GIT_USERNAME',
    );

    const containerId = uuidv4();

    const createContainerCommand = `docker run -itd --network none -v ~/editor:/editor \
--name ${containerId} mergemasters/alpine-git:0.2 /bin/sh`;
    const copyFilesCommand = `docker cp ~/quizzes/${quizId}/. ${containerId}:/home/${user}/quiz/`;
    const chownCommand = `docker exec -u root ${containerId} chown -R ${user}:${user} /home/${user}`;
    const coreEditorCommand = `docker exec -w /home/quizzer/quiz/ -u ${user} ${containerId} git config --global core.editor /editor/output.sh`;
    await this.sshService.executeSSHCommand(
      createContainerCommand,
      copyFilesCommand,
      chownCommand,
      coreEditorCommand,
    );

    return containerId;
  }

  async isValidateContainerId(containerId: string): Promise<boolean> {
    const command = `docker ps -a --filter "name=${containerId}" --format "{{.ID}}"`;

    const { stdoutData, stderrData } =
      await this.sshService.executeSSHCommand(command);

    if (stderrData) {
      // 도커 미설치 등의 에러일 듯
      throw new Error(stderrData);
    }

    return stdoutData.trim() !== '';
  }

  async deleteContainer(containerId: string): Promise<void> {
    const command = `docker rm -f ${containerId}`;

    const { stdoutData, stderrData } =
      await this.sshService.executeSSHCommand(command);

    this.logger.log('info', `container deleted : ${stdoutData.trim()}`);

    if (stderrData) {
      throw new Error(stderrData);
    }
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
    for (const log of logs) {
      if (log.mode === 'command') {
        await this.runGitCommand(containerId, log.message);
      } else if (log.mode === 'editor') {
        await this.runEditorCommand(containerId, recentMessage, log.message);
      } else {
        throw new Error('Invalid log mode');
      }
      recentMessage = log.message;
    }
  }
}
