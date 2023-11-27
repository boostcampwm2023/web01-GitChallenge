import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { CommandResponseDto } from 'src/quizzes/dto/command-response.dto';
import { Client } from 'ssh2';
import shellEscape from 'shell-escape';

@Injectable()
export class ContainersService {
  constructor(
    private configService: ConfigService,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  private async getSSH(): Promise<Client> {
    const conn = new Client();

    await new Promise<void>((resolve, reject) => {
      conn
        .on('ready', () => resolve())
        .on('error', reject)
        .connect({
          host: this.configService.get<string>('CONTAINER_SSH_HOST'),
          port: this.configService.get<number>('CONTAINER_SSH_PORT'),
          username: this.configService.get<string>('CONTAINER_SSH_USERNAME'),
          password: this.configService.get<string>('CONTAINER_SSH_PASSWORD'),
        });
    });

    return conn;
  }

  private async executeSSHCommand(
    command: string,
  ): Promise<{ stdoutData: string; stderrData: string }> {
    const conn: Client = await this.getSSH();

    return new Promise((resolve, reject) => {
      conn.exec(command, (err, stream) => {
        if (err) {
          reject(new Error('SSH command execution Server error'));
          return;
        }
        let stdoutData = '';
        let stderrData = '';
        stream
          .on('close', () => {
            conn.end();
            resolve({ stdoutData, stderrData });
          })
          .on('data', (chunk) => {
            stdoutData += chunk;
          });

        stream.stderr.on('data', (chunk) => {
          stderrData += chunk;
        });
      });
    });
  }

  async runGitCommand(
    container: string,
    command: string,
  ): Promise<CommandResponseDto> {
    const { stdoutData, stderrData } = await this.executeSSHCommand(
      `docker exec -w /home/quizzer/quiz/ -u quizzer ${container} /usr/local/bin/restricted-shell ${command}`,
    );

    if (stdoutData.endsWith('# CREATED_BY_OUTPUT.SH\n')) {
      return { message: stdoutData, result: 'editor' };
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

    const { stdoutData, stderrData } = await this.executeSSHCommand(
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

    const createContainerCommand = `docker run -itd --network none -v ~/editor:/editor \
mergemasters/alpine-git:0.2 /bin/sh`;
    const { stdoutData } = await this.executeSSHCommand(createContainerCommand);
    const containerId = stdoutData.trim();

    // TODO: 연속 실행할 때 매번 SSH 하는거 리팩토링 해야 함
    const copyFilesCommand = `docker cp ~/quizzes/${quizId}/. ${containerId}:/home/${user}/quiz/`;
    await this.executeSSHCommand(copyFilesCommand);

    const chownCommand = `docker exec -u root ${containerId} chown -R ${user}:${user} /home/${user}`;
    await this.executeSSHCommand(chownCommand);

    const coreEditorCommand = `docker exec -w /home/quizzer/quiz/ -u ${user} ${containerId} git config --global core.editor /editor/output.sh`;
    await this.executeSSHCommand(coreEditorCommand);

    return containerId;
  }

  async isValidateContainerId(containerId: string): Promise<boolean> {
    const command = `docker ps -a --filter "id=${containerId}" --format "{{.ID}}"`;

    const { stdoutData, stderrData } = await this.executeSSHCommand(command);

    if (stderrData) {
      // 도커 미설치 등의 에러일 듯
      throw new Error(stderrData);
    }

    return stdoutData.trim() !== '';
  }

  async deleteContainer(containerId: string): Promise<void> {
    const command = `docker rm -f ${containerId}`;

    const { stdoutData, stderrData } = await this.executeSSHCommand(command);

    console.log(`container deleted : ${stdoutData}`);

    if (stderrData) {
      throw new Error(stderrData);
    }
  }
}
