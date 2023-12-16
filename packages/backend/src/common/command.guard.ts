import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CommandGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const mode = request.body['mode'];
    const message = request.body['message'];
    if (
      !(
        typeof mode === 'string' &&
        typeof message === 'string' &&
        (mode === 'editor' ||
          (mode === 'command' &&
            message.startsWith('git') &&
            !this.isMessageIncluded(message, [
              ';',
              '>',
              '|',
              '<',
              '&',
              '$',
              '(',
              ')',
              '{',
              '}',
              `
`,
            ])))
      )
    ) {
      throw new ForbiddenException('금지된 명령입니다');
    }
    return true;
  }
  private isMessageIncluded(message: string, keywords: string[]): boolean {
    return keywords.some((keyword) => message.includes(keyword));
  }
}
