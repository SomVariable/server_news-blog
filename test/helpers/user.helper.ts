import { UserOkDto } from 'src/api/user/dto/ok-response/user-ok.dto';
import { UpdateUserDto } from 'src/api/user/dto/update-user.dto';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';
import * as request from 'supertest';


export const deleteSelfOperation = async (app, accessToken: string) => {
    await request(app.getHttpServer())
        .delete(`user/self`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('User-Agent', 'Mobile')
        .expect(200)

    return true
};

export const getSelfData = async (app, accessToken: string) => {
    const user = await request(app.getHttpServer())
        .get(`user/self`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('User-Agent', 'Mobile')
        .expect(200);

    const responseBody: UserOkDto = await JSON.parse(user.text);

    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('user');
    expect(responseBody.data.user).toHaveProperty('id');
    expect(responseBody.data.user).toHaveProperty('role');
    expect(responseBody.data.user).toHaveProperty('accountStatus');
    expect(responseBody.data.user).not.toHaveProperty('email');
    expect(responseBody.data.user).not.toHaveProperty('hash');
    expect(responseBody.data.user).not.toHaveProperty('UserProfile');

    return user;
}

export const getSelfDataWithFullData = async (app, accessToken: string) => {
    const user = await request(app.getHttpServer())
        .get(`user/self/full-data`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('User-Agent', 'Mobile')
        .expect(200);

    const responseBody: UserOkDto = await JSON.parse(user.text);

    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('user');
    expect(responseBody.data.user).toHaveProperty('id');
    expect(responseBody.data.user).toHaveProperty('role');
    expect(responseBody.data.user).toHaveProperty('accountStatus');
    expect(responseBody.data.user).not.toHaveProperty('email');
    expect(responseBody.data.user).not.toHaveProperty('hash');
    expect(responseBody.data.user).toHaveProperty('UserProfile');

    return user;
}

export const updateSelf = async (app, accessToken: string, dto: UpdateUserDto) => {
    const user = await request(app.getHttpServer())
        .patch(`user/self`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('User-Agent', 'Mobile')
        .send(dto)
        .expect(200);

    const responseBody: UserOkDto = await JSON.parse(user.text);

    
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('user');
    expect(responseBody.data.user).toHaveProperty('id');
    expect(responseBody.data.user).toHaveProperty('role');
    expect(responseBody.data.user).toHaveProperty('accountStatus');
    expect(responseBody.data.user).not.toHaveProperty('email');
    expect(responseBody.data.user).not.toHaveProperty('hash');
    expect(responseBody.data.user).not.toHaveProperty('UserProfile');

    for( const property in dto ) {
        expect(responseBody.data.user).toHaveProperty(property, dto[property]);
    }

    return user;
}

export const deleteSelf = async (app, accessToken: string) => {
    const deletedUser = await request(app.getHttpServer())
        .delete(`user/self`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('User-Agent', 'Mobile')
        .expect(200);

    const responseBody: UserOkDto = await JSON.parse(deletedUser.text);

    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('user');
    expect(responseBody.data.user).toHaveProperty('id');
    expect(responseBody.data.user).toHaveProperty('role');
    expect(responseBody.data.user).toHaveProperty('accountStatus');
    expect(responseBody.data.user).not.toHaveProperty('email');
    expect(responseBody.data.user).not.toHaveProperty('hash');

    return deletedUser;
};

export const getUser = async (app, id: number) => {

}

export const getUsers = async (app, paginationParams: QueryPaginationParam) => {

}

export const getUserWithTranslation = async (app, id: number) => {

}

export const getUsersWithTranslation = async (app, paginationParams: QueryPaginationParam) => {

}