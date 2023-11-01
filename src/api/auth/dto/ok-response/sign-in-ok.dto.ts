import { ApiProperty } from "@nestjs/swagger";
import { USER_EXAMPLE } from "src/api/user/constants/user.constants";
import { SIGN_UP_EXAMPLE, signUpReturnType } from "../../constants/auth.constants";


export class SignInOkDto {
    @ApiProperty({example: SIGN_UP_EXAMPLE})
    data: signUpReturnType
}