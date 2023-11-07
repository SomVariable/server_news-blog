import { ROLE, ACCOUNT_STATUS, UserProfile } from '@prisma/client';
 

export type userReturnType = {
    id: number, 
    role: ROLE,
    accountStatus: ACCOUNT_STATUS
}

export type userReturnTypeWithProfile = userReturnType & {
    UserProfile: UserProfile[]
}

export type userOkDataType = {
    user: userReturnType
}

export type userWithFullDataOkDataType = {
    user: userReturnTypeWithProfile
}

export type usersOkDataType = {
    users: userReturnType[]
}

export type usersWithFullDataOkDataType = {
    user: userReturnTypeWithProfile[]
}