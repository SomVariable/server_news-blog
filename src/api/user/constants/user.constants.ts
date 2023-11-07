import { ROLE, ACCOUNT_STATUS, LangCode, Prisma } from '@prisma/client';
import { userReturnTypeWithProfile } from '../types/user.types';

export const UserProfileInclude: Prisma.UserInclude = {
    UserProfile: {},
  };
  

export const USER_EXAMPLE = {
    id: 10,
    role: ROLE.USER,
    accountStatus: ACCOUNT_STATUS.ACTIVE
}

export const USER_EXAMPLE_With_Full_Data: userReturnTypeWithProfile = {
    id: 10,
    role: ROLE.USER,
    accountStatus: ACCOUNT_STATUS.ACTIVE,
    UserProfile: [
        { 
            id: 115, 
            userId: 10, 
            langCode: LangCode.EN, 
            firstName: 'Name',
            lastName: 'Surname',
            middleName: 'MiddleName',
            photoId: 19
         }
    ]
}

export enum USER_NOT_FOUND_EXCEPTION {
    MISSING_USER = 'there is no such user'
}