import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        this.logger.verbose(`Incoming request: ${request.method} ${request.url}`);

        return next.handle().pipe(
            tap((data) => {
                this.logger.verbose(`Outgoing response: ${request.method} ${request.url} ${JSON.stringify(data)}`);
            })
        );
    }
}