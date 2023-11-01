// import * as request from 'supertest';

// export const deleteSelf = async (app, accessToken: string) => {
//     const deletedUser = await request(app.getHttpServer())
//         .delete(`/user`)
//         .set('Authorization', `Bearer ${accessToken}`)
//         .set('User-Agent', 'Mobile')
//         .expect(200);

//     const responseBody: DeletedOkResponse = await JSON.parse(deletedUser.text);

//     expect(responseBody).toHaveProperty('message');
//     expect(responseBody).toHaveProperty('data');
//     expect(responseBody.data).toHaveProperty('id');
//     expect(responseBody.data).toHaveProperty('email');
//     expect(responseBody.data).not.toHaveProperty('hash');

//     return deletedUser;
// };