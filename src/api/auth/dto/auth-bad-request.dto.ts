import { ApiProperty } from "@nestjs/swagger";
import { AUTH_BAD_REQUEST_MESSAGE } from "../constants/auth.constants";


export class AuthBadRequestDto {
    @ApiProperty({
        enum: AUTH_BAD_REQUEST_MESSAGE
    })
    message: string
}