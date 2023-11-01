import { ApiProperty } from "@nestjs/swagger";
import { jwtReturnType } from "src/api/jwt-helper/types/jwt-helper.types";
import { VERIFY_EXAMPLE } from "src/api/verification/constants/constants";


export class VerifyOkDto {
    @ApiProperty({example: VERIFY_EXAMPLE})
    data: jwtReturnType
}
