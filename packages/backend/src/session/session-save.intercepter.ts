import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { Response } from 'express';

@Injectable()
export class SessionUpdateInterceptor implements NestInterceptor {
  constructor(private sessionService: SessionService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    let sessionId = request.cookies.sessionId; // 세션 ID 추출

    return next.handle().pipe(
      tap(() => {
        sessionId =
          sessionId || this.extractSessionId(response.getHeader('Set-Cookie')); // 세션 ID가 없으면 쿠키에서 추출
        // 세션 업데이트 로직
        this.sessionService.saveSession(sessionId);
      }),
    );
  }

  private extractSessionId(cookieStr) {
    const sessionIdMatch = /sessionId=([^;]+)/.exec(cookieStr);
    return sessionIdMatch ? sessionIdMatch[1] : null;
  }
}
