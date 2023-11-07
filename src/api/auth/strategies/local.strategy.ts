import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AUTH_BAD_REQUEST_MESSAGE } from '../constants/auth.constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string){
    this.logger.verbose(`LocalStrategy. validate method. Data: email: ${email}, password: ${password}`)
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(AUTH_BAD_REQUEST_MESSAGE.WRONG_DATA);
    }

    this.logger.verbose(`LocalStrategy. validate method. Validation success`)
    return true;
  }
}
