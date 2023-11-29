import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SSHConnectionPoolService } from './ssh.connection-pool.service';

@Injectable()
export class SshService {
  private sshPool: SSHConnectionPoolService;

  constructor(
    private configService: ConfigService,
    sshConnectionPoolService: SSHConnectionPoolService,
  ) {
    this.sshPool = sshConnectionPoolService;
  }

  async executeSSHCommand(
    ...commands: string[]
  ): Promise<{ stdoutData: string; stderrData: string }> {
    const sshConnection = await this.sshPool.getConnection();

    const commandString = commands.join('; ');
    const result = await new Promise<{
      stdoutData: string;
      stderrData: string;
    }>((resolve, reject) => {
      sshConnection.client.exec(commandString, (err, stream) => {
        if (err) {
          reject(new Error('SSH command execution failed: ' + err.message));
          return;
        }
        let stdoutData = '';
        let stderrData = '';

        stream
          .on('close', (code, signal) => {
            this.sshPool.returnConnection(sshConnection);
            if (code === 0) {
              resolve({ stdoutData, stderrData });
            } else {
              reject(
                new Error(
                  `SSH command failed with code ${code} and signal ${signal}`,
                ),
              );
            }
          })
          .on('data', (data) => {
            stdoutData += data.toString();
          })
          .stderr.on('data', (data) => {
            stderrData += data.toString();
          });
      });
    });

    return result;
  }
}
