import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { performance } from 'perf_hooks';

@Injectable()
export class ExecutionTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = performance.now();
    const methodName = context.getHandler().name; // 현재 실행 중인 함수의 이름을 얻습니다.
    const className = context.getClass().name; // 현재 실행 중인 클래스의 이름을 얻습니다.

    return next.handle().pipe(
      tap(() => {
        const duration = performance.now() - start;
        console.log(
          `${className}.${methodName} 실행 시간: ${duration.toFixed(2)} 밀리초`,
        );
      }),
    );
  }
}

// 커스텀 데코레이터 정의
export function MeasureExecutionTime() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const start = performance.now();
      const result = await originalMethod.apply(this, args);
      const duration = performance.now() - start;
      console.log(
        `${propertyKey} 함수 실행 시간: ${duration.toFixed(2)} 밀리초`,
      );
      return result;
    };

    return descriptor;
  };
}
