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

export async function getCachedDiff(container: string): Promise<string> {
  const { stdoutData } = await executeSSHCommand(
    `docker exec -u quizzer -w /home/quizzer/quiz ${container} git diff --cached`,
  );

  return stdoutData;
}

export async function getTreeHead(
  container: string,
  branch: string,
): Promise<string> {
  const { stdoutData } = await executeSSHCommand(
    `docker exec -u quizzer -w /home/quizzer/quiz ${container} sh -c "git cat-file -p \\\$(git rev-parse ${branch}) | grep tree | awk '{print \\\$2}'"`,
  );

  return stdoutData;
}
