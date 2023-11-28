import { executeSSHCommand } from '../../common/ssh.util';

export async function isDirectoryExist(
  container: string,
  path: string,
): Promise<boolean> {
  const { stdoutData } = await executeSSHCommand(
    `docker exec -w /home/quizzer/quiz/ -u quizzer ${container} ls -l ${path} | grep ^d`,
  );

  return stdoutData !== '';
}

export async function getConfig(
  container: string,
  key: string,
): Promise<string> {
  const { stdoutData } = await executeSSHCommand(
    `docker exec -u quizzer -w /home/quizzer/quiz ${container} git -C /home/quizzer/quiz config user.${key}`,
  );

  return stdoutData;
}
