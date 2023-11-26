import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/**
 * @description session guard
 * @returns {boolean}
 * check if sessionId exists
 * @dependency cookie-parser
 */
@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    // cookie-parser must be used before this guard
    return request['cookies'].sessionId;
  }
}
