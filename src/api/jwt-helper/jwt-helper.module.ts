import { Module } from '@nestjs/common';
import { JwtHelperService } from './jwt-helper.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessJwtStrategy } from './strategies/access-jwt.strategy';

import { KvStoreModule } from '../kv-store/kv-store.module';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({ global: true }), KvStoreModule, ConfigModule],
  controllers: [],
  providers: [JwtHelperService, AccessJwtStrategy, RefreshJwtStrategy],
  exports: [JwtHelperService],
})
export class JwtHelperModule {}
