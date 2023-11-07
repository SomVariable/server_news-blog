import { ApiProperty } from "@nestjs/swagger";
import { usersWithFullDataOkDataType } from "../../types/user.types";
import { USER_EXAMPLE, USER_EXAMPLE_With_Full_Data } from "../../constants/user.constants";

export class UsersWithFullDataOkDto {
    @ApiProperty({example: [USER_EXAMPLE_With_Full_Data, USER_EXAMPLE_With_Full_Data, USER_EXAMPLE_With_Full_Data,]})
    data: usersWithFullDataOkDataType
}