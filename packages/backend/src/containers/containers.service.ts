import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandResponseDto } from 'src/quizzes/dto/command-response.dto';
import { Client } from 'ssh2';

@Injectable()
export class ContainersService {
  constructor(private configService: ConfigService) {}

  async runSSHCommand(
    container: string,
    command: string,
  ): Promise<CommandResponseDto> {
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

    return new Promise((resolve, reject) => {
      conn.exec(
        `docker exec -w ~/quiz/ ${container} ${command}`,
        (err, stream) => {
          if (err) {
            reject(new Error('SSH command execution Server error'));
            return;
          }

          let stdoutData = '';
          let stderrData = '';
          stream
            .on('close', () => {
              conn.end();
              if (stderrData) {
                resolve({ message: stderrData, result: 'fail' });
              } else {
                resolve({ message: stdoutData, result: 'success' });
              }
            })
            .on('data', (chunk) => {
              stdoutData += chunk;
            });

          stream.stderr.on('data', (chunk) => {
            stderrData += chunk;
          });
        },
      );
    });
  }
}
