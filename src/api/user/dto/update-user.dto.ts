import { ApiProperty, PartialType } from '@nestjs/swagger';
import {  ROLE, ACCOUNT_STATUS } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { SignUpDto } from 'src/api/auth/dto/sign-up.dto';

export class UpdateUserDto extends PartialType(SignUpDto) {
    @ApiProperty()
    @IsOptional()
    role?: ROLE;

    @ApiProperty()
    @IsOptional()
    accountStatus?: ACCOUNT_STATUS;

    @ApiProperty()
    @IsOptional()
    isConfirmedChangePassword?: boolean;
}
