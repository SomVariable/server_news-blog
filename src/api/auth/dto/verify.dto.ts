import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @Length(4, 30)
    email: string;

    @ApiProperty()
    @IsString()
    verifyCode: string;
}
