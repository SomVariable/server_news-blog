import * as request from 'supertest';
import { deleteSelf, deleteSelfOperation } from './user.helper';
import { INestApplication } from '@nestjs/common';
import { SignUpOkDto } from 'src/api/auth/dto/ok-response/sign-up-ok.dto';
import { SignUpDto } from 'src/api/auth/dto/sign-up.dto';
import { fullSignUpType } from 'test/types/test.types';
import { getSession } from './kv-store.helper';
import { VerifyDto } from 'src/api/auth/dto/verify.dto';
import { VerifyOkDto } from 'src/api/auth/dto/ok-response/verify-ok.dto';
import {Session} from 'src/api/kv-store/kv-types/kv-store.type'

export const userControl = (app, mockUser, _?: any) => {
    return async (func: (app, data, mockUser, _?) => void) => {
        const data: fullSignUpType = await signUpF(app, {
            email: mockUser.email,
            password: mockUser.password,
        });

        const { responseBody, dto, sessionRes, responseVerifyBody } = data;

        try {
            await func(app, data, mockUser, _);
        } finally {
            await deleteSelfOperation(app, responseVerifyBody.data.jwtToken);
            //await deleteSession(app, responseBody.person.id);
        }

    };
};

export const signUp = async (app, dto: SignUpDto) => {
    const signUpRes = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .set('User-Agent', 'Mobile')
        .send(dto)
        .expect(201);

    const responseBody: SignUpOkDto = await JSON.parse(signUpRes.text);

    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('verificationProps');
    expect(responseBody.data).toHaveProperty('user');
    expect(responseBody.data.user).toHaveProperty('id');
    expect(responseBody.data.user).not.toHaveProperty('email');
    expect(responseBody.data.user).toHaveProperty('accountStatus');
    expect(responseBody.data.user).toHaveProperty('role');
    expect(responseBody.data.user).not.toHaveProperty('hash');

    return responseBody;
}

export const verifyUser = async (app, dto: VerifyDto) => {
    const signUpRes = await request(app.getHttpServer())
        .post('/auth/sign-up/verify')
        .set('User-Agent', 'Mobile')
        .send(dto)
        .expect(201);

    const responseBody: VerifyOkDto = await JSON.parse(signUpRes.text);

    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('jwtToken');
    expect(responseBody.data).toHaveProperty('refreshToken');

    return responseBody;
}

export const signUpF = async (app, mockUser: SignUpDto): Promise<fullSignUpType> => {
    const user = await signUp(app, mockUser)

    const verifiedRes = await verifyUser(app, {
        email: mockUser.email,
        verifyCode: user.data.verificationProps.verificationKey
    })

    const session = await getSession(app, verifiedRes.data.jwtToken)

    return {
        dto: mockUser,
        sessionRes: session,
        responseVerifyBody: verifiedRes,
        responseBody: user
    }
}
