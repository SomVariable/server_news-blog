import { ROLE, ACCOUNT_STATUS } from '@prisma/client';


export const USER_EXAMPLE = {
    id: 10,
    role: ROLE.USER,
    accountStatus: ACCOUNT_STATUS.ACTIVE
}

export enum USER_NOT_FOUND_EXCEPTION {
    MISSING_USER = 'there is no such user'
}