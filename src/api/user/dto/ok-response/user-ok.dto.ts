import { ApiProperty } from "@nestjs/swagger";
import { userOkDataType } from "../../types/user.types";
import { USER_EXAMPLE } from "../../constants/user.constants";


export class UserOkDto {
    @ApiProperty({ example: USER_EXAMPLE})
    data: userOkDataType
}