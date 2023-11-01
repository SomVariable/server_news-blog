import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { KvStoreModule } from '../kv-store/kv-store.module';
import { UserModule } from '../user/user.module';
import { VerificationModule } from '../verification/verification.module';
import { JwtHelperModule } from '../jwt-helper/jwt-helper.module';

@Module({
  imports: [
    DatabaseModule, KvStoreModule, UserModule, 
    VerificationModule, JwtHelperModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
