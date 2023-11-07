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
export class UsersInterceptor implements NestInterceptor {
    private readonly logger = new Logger(UsersInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: any) => {
                this.logger.verbose(`UserInterceptor. Output data before ${JSON.stringify(data)}`)
                if('users' in data && Array.isArray(data.users)){
                    data.users.map(user => {
                        if (
                            typeof user === 'object' &&
                            'hash' in user &&
                            'email' in user
                        ) {
                            delete user.hash
                            delete user.email
                        }
                    })
                }
                
                this.logger.verbose(`UserInterceptor. Output data after ${JSON.stringify(data)}`)
                return {data}
            }),
        );
    }
}
