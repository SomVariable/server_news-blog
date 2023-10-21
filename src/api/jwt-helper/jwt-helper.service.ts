import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AccessJwtConfig } from '../../config/jwt.config';
import { jwtType } from './types/jwt-helper.types';

@Injectable()
export class JwtHelperService {
  constructor(private readonly jwtService: JwtService) {}
  //repl type any to user
  async generateToken(
    { id, email, role }: any,
    sessionKey: string,
    options?: JwtSignOptions,
  ): Promise<string> {
    const payload = { email, id, sessionKey, role };
    const jwt: string = this.jwtService.sign(payload, options);

    return jwt;
  }

  async getDataFromJwt(
    authorization: string,
    option: JwtSignOptions = AccessJwtConfig,
  ): Promise<jwtType> {
    const token = authorization?.replace('Bearer ', '');
    const dataFromToken = await this.jwtService.verify(token, option);

    return dataFromToken;
  }
}
