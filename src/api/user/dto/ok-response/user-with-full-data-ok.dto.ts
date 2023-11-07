import { ApiProperty } from "@nestjs/swagger";
import { userWithFullDataOkDataType } from "../../types/user.types";
import { USER_EXAMPLE_With_Full_Data } from "../../constants/user.constants";

export class UserWithFullDataOkDto {
    @ApiProperty({example: USER_EXAMPLE_With_Full_Data})
    data: userWithFullDataOkDataType
}