import { ApiProperty } from "@nestjs/swagger";
import { usersOkDataType } from "../../types/user.types";
import { USER_EXAMPLE } from "../../constants/user.constants";

export class UsersOkDto {
    @ApiProperty({example: [USER_EXAMPLE, USER_EXAMPLE, USER_EXAMPLE,]})
    data: usersOkDataType
}