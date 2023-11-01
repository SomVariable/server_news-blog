import { ROLE, ACCOUNT_STATUS } from '@prisma/client';
import { UserProfile } from 'src/api/user-profile/entities/user-profile.entity';

export type userReturnType = {
    id: number, 
    role: ROLE,
    accountStatus: ACCOUNT_STATUS
}

export type userReturnTypeWithProfile = userReturnType & {
    UserProfile: UserProfile[]
}