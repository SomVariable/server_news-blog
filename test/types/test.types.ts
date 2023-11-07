import { Session } from 'src/api/kv-store/kv-types/kv-store.type';
import { SignUpOkDto } from 'src/api/auth/dto/ok-response/sign-up-ok.dto';
import { VerifyOkDto } from 'src/api/auth/dto/ok-response/verify-ok.dto';
import { SignUpDto } from 'src/api/auth/dto/sign-up.dto';

export type fullSignUpType = {
  sessionRes: Session;
  responseBody: SignUpOkDto;
  responseVerifyBody: VerifyOkDto;
  dto: SignUpDto;
};

// export type signUpAdminType = {
//   sessionRes: Session;
// };
