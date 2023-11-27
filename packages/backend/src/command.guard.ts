import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CommandGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const command = request.body['command'];
    return typeof command === 'string' && command.startsWith('git');
  }
}
