import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { KvStoreService } from '../kv-store/kv-store.service';
import {
  VERIFICATION_BAD_REQUEST_ERRORS,
  VERIFICATION_OK,
  VERIFICATION_SERVER_ERRORS,
  VERIFY_KEY_TIMESTAMP,
} from './constants/constants';
import {
  Session,
  SetVerificationProps,
} from '../kv-store/kv-types/kv-store.type';
import { SignUpDto } from '../auth/dto/sign-up.dto';


@Injectable()
export class VerificationService {
  constructor(
    private readonly kvStoreService: KvStoreService,
  ) {}

  async sendVerificationCode(
    userData: SignUpDto,
    sessionKey: string,
    verificationKey: string,
  ) {
    try {
      const data: SetVerificationProps = {
        verificationKey,
        verificationTimestamp: Date.now().toString(),
      };

      await this.kvStoreService.setVerificationProps(sessionKey, data);
      
      return data
    } catch (error) {
      throw new InternalServerErrorException(VERIFICATION_SERVER_ERRORS.FAILED);
    }
  }

  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async validateVerifyCode(
    verifyCode: string,
    sessionKey: string,
  ): Promise<boolean> {
    const session = await this.kvStoreService.getSession(sessionKey);

    if (
      parseInt(session.verificationTimestamp) + VERIFY_KEY_TIMESTAMP <
      Date.now()
    ) {
      throw new BadRequestException(VERIFICATION_BAD_REQUEST_ERRORS.OVERSTAYED);
    }

    if (session.verificationKey !== verifyCode) {
      throw new BadRequestException(VERIFICATION_BAD_REQUEST_ERRORS.WRONG_KEY);
    }

    return true;
  }
}
