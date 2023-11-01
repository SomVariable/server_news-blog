import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { NewsModule } from './api/news/news.module';
import { UserModule } from './api/user/user.module';
import { UserProfileModule } from './api/user-profile/user-profile.module';
import { PhotoModule } from './api/photo/photo.module';
import { VerificationModule } from './api/verification/verification.module';
import { KvStoreModule } from './api/kv-store/kv-store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    NewsModule,
    KvStoreModule,
    VerificationModule,
    UserModule,
    UserProfileModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
