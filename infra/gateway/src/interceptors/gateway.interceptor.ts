// gateway/src/interceptors/gateway.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class GatewayInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    
    console.log(`[Gateway] ${request.method} ${request.originalUrl}`);
    
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`[Gateway] ${request.method} ${request.originalUrl} - ${Date.now() - now}ms`);
      }),
    );
  }
}