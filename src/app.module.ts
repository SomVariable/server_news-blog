import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './config/mailer.config';
import { AuthModule } from './api/auth/auth.module';
import { NewsModule } from './api/news/news.module';
import { UserModule } from './api/user/user.module';
import { UserProfileModule } from './api/user-profile/user-profile.module';
import { PhotoModule } from './api/photo/photo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MailerModule.forRoot(mailerConfig),
    AuthModule,
    NewsModule,
    UserModule,
    UserProfileModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
