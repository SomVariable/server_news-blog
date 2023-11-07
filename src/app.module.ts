import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './api/auth/auth.module';
import { NewsModule } from './api/news/news.module';
import { UserModule } from './api/user/user.module';
import { UserProfileModule } from './api/user-profile/user-profile.module';
import { PhotoModule } from './api/photo/photo.module';
import { VerificationModule } from './api/verification/verification.module';
import { KvStoreModule } from './api/kv-store/kv-store.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
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
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor
  }],
})

export class AppModule {}
