import { HttpAdapterHost } from '@nestjs/core';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DatabaseModule } from 'src/api/database/database.module';
import { validate } from 'class-validator';
import { SignInDto } from 'src/api/auth/dto/sign-in.dto';

import {
  activeSession,
  blockSession,
  deleteSession,
  getSession,
} from './helpers/kv-store.helper';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { signUpF } from './helpers/auth.helper';
import { StrongPassword } from 'src/common/decorators/strong-password.decorator';
import { STRONG_PASSWORD } from './constants/test.constants';
import { UniqueNumberGenerator } from './helpers/generateUniqueNumber.helper';
import { deleteSelf, deleteSelfOperation, getSelfData } from './helpers/user.helper';

const mockUser = {
  email: `a@gmail.com`,
  password: '123QWE_qwe!@#13',
  accessToken: '',
  refreshToken: '',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = await moduleFixture.createNestApplication();

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    await app.init();
    await app.listen(3000 + Math.floor(Math.random() * 10 + 12));

  });


  it('should test sign-up user', async () => {
    const signUpData = await signUpF(app, {
      email: `${UniqueNumberGenerator.lengthCountControl('signUpTest')}@gmail.com`,
      password: STRONG_PASSWORD
    })

    // console.log(signUpData.responseVerifyBody.data.jwtToken)
    // await getSelfData(app, signUpData.responseVerifyBody.data.jwtToken)

    return true
  })

  afterAll(async () => {
    return await app.close();
  });
});
