import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CommandGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const mode = request.body['mode'];
    const message = request.body['message'];
    return (
      typeof mode === 'string' &&
      typeof message === 'string' &&
      (mode === 'editor' ||
        (mode === 'command' &&
          message.startsWith('git') &&
          !this.isMessageIncluded(message, [';', '>', '|', '<'])))
    );
  }
  private isMessageIncluded(message: string, keywords: string[]): boolean {
    return keywords.some((keyword) => message.includes(keyword));
  }
}
