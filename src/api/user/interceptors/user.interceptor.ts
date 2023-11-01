import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@prisma/client'

@Injectable()
export class UserInterceptor implements NestInterceptor {
    private readonly logger = new Logger(UserInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: any) => {
                this.logger.verbose(`UserInterceptor. Output data before ${JSON.stringify(data)}`)
                if (
                    typeof data === 'object' &&
                    'user' in data &&
                    'hash' in data.user &&
                    'email' in data.user
                ) {
                    delete data.user.hash
                    delete data.user.email
                }

                this.logger.verbose(`UserInterceptor. Output data after ${JSON.stringify(data)}`)
                return {data}
            }),
        );
    }
}
