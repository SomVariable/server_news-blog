import { PickType } from "@nestjs/swagger";
import { SignUpDto } from "src/api/auth/dto/sign-up.dto";
import { CreateUserProfileDto } from "src/api/user-profile/dto/create-user-profile.dto";

export class FindUserByDto extends PickType( SignUpDto, ['email']) {}