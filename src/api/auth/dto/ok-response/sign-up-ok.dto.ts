import { ApiProperty } from "@nestjs/swagger";
import { SIGN_UP_EXAMPLE, signUpReturnType } from "../../constants/auth.constants";

export class SignUpOkDto {
    @ApiProperty({example: SIGN_UP_EXAMPLE})
    data: signUpReturnType
}