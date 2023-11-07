import { ROLE, ACCOUNT_STATUS } from '@prisma/client';
import { SetVerificationProps } from 'src/api/kv-store/kv-types/kv-store.type';
import { userReturnType } from "src/api/user/types/user.types"

export const LOCAL = 'local'

export enum AUTH_BAD_REQUEST_MESSAGE {
    WRONG_DATA = 'wrong data'
}

export enum AUTH_NOT_FOUND_MESSAGE {

}

export type signUpReturnType = {
    user: userReturnType,
    verificationProps: SetVerificationProps
}

export const SIGN_UP_EXAMPLE = {
    user: {
        id: 99,
        role: ROLE.USER,
        accountStatus: ACCOUNT_STATUS.ACTIVE
    },
    verificationProps: {
        verificationTimestamp: Date.now(),
        verificationKey: '13324112'
    }
} 