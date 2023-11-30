import { Injectable } from '@nestjs/common';
import { SSHConnectionPoolService } from './ssh.connection-pool.service';
import { processCarriageReturns } from '../common/util';

@Injectable()
export class SshService {
  constructor(private sshPool: SSHConnectionPoolService) {}

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
          .on('close', () => {
            this.sshPool.returnConnection(sshConnection);
            resolve({
              stdoutData: processCarriageReturns(stdoutData),
              stderrData: processCarriageReturns(stderrData),
            });
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
