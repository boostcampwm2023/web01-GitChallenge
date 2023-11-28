import { Client } from 'ssh2';
import 'dotenv/config';

async function getSSH(
  host: string,
  port: number,
  username: string,
  password: string,
): Promise<Client> {
  const conn = new Client();

  await new Promise<void>((resolve, reject) => {
    conn
      .on('ready', () => resolve())
      .on('error', reject)
      .connect({
        host,
        port,
        username,
        password,
      });
  });

  return conn;
}
export async function executeSSHCommand(
  ...commands: string[]
): Promise<{ stdoutData: string; stderrData: string }> {
  const conn: Client = await getSSH(
    process.env.CONTAINER_SSH_HOST,
    Number(process.env.CONTAINER_SSH_PORT),
    process.env.CONTAINER_SSH_USERNAME,
    process.env.CONTAINER_SSH_PASSWORD,
  );

  const result = await commands.reduce(
    async (prevPromise, command) => {
      const accum = await prevPromise;
      const { stdoutData, stderrData } = await new Promise<{
        stdoutData: string;
        stderrData: string;
      }>((resolve, reject) => {
        conn.exec(command, (err, stream) => {
          if (err) {
            reject(new Error('SSH command execution Server error'));
            return;
          }
          let stdoutData = '';
          let stderrData = '';
          stream
            .on('close', () => {
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

      return {
        stdoutData: accum.stdoutData + stdoutData,
        stderrData: accum.stderrData + stderrData,
      };
    },
    Promise.resolve({ stdoutData: '', stderrData: '' }),
  );

  conn.end();
  return result;
}
