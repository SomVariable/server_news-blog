// import { INestApplication } from '@nestjs/common';
// import { SignUpOkDto } from 'src/api/auth/dto/ok-response/sign-up-ok.dto';
// import { SignUpDto } from 'src/api/auth/dto/sign-up.dto';
// import * as request from 'supertest';
// import { fullSignUpType, signUpAdminType } from 'test/types/test.types';
// import { getSession } from './kv-store.helper';

// export const userControl = (app, mockUser, _?: any) => {
//   return async (func: (app, data, mockUser, _?) => void) => {
//     const data: fullSignUpType = await signUpF(app, {
//       email: mockUser.email,
//       password: mockUser.password,
//     });

//     const { responseBody, responseVerifyBody } = data;

//     try {
//       await func(app, data, mockUser, _);
//     } finally {
//       await deleteSelf(app, responseVerifyBody.data.jwtToken);
//       await deleteSession(app, responseBody.person.id);
//     }

//   };
// };

// export const signUp = async (app, dto: SignUpDto) => {
//   const signUpRes = await request(app.getHttpServer())
//     .post('/auth/sign-up')
//     .set('User-Agent', 'Mobile')
//     .send(dto)
//     .expect(201);

//   const responseBody: SignUpOkDto = await JSON.parse(signUpRes.text);
  
//   expect(responseBody).toHaveProperty('data');
//   expect(responseBody.data).toHaveProperty('verificationProps');
//   expect(responseBody.data).toHaveProperty('user');
//   expect(responseBody.data.user).toHaveProperty('id');
//   expect(responseBody.data.user).not.toHaveProperty('email');
//   expect(responseBody.data.user).toHaveProperty('accountStatus');
//   expect(responseBody.data.user).toHaveProperty('role');
//   expect(responseBody.data.user).not.toHaveProperty('hash');

//   return responseBody;
// }

// export const signUpF = async (app, mockUser): Promise<fullSignUpType> => {
//   const user = await signUp(app, mockUser)
//   const session = await getSession(app, user.data.user.id)

//   return {
//     dto: mockUser, 
//     sessionRes: session,
//     responseBody: user
//   }
// }
