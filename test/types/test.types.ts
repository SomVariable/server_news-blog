import { Session } from 'inspector';
import { SignUpOkDto } from 'src/api/auth/dto/ok-response/sign-up-ok.dto';
import { SignUpDto } from 'src/api/auth/dto/sign-up.dto';

export type fullSignUpType = {
  sessionRes: Session;
  responseBody: SignUpOkDto;
  dto: SignUpDto;
};

// export type signUpAdminType = {
//   sessionRes: Session;
// };
