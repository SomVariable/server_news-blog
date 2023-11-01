import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { StrongPassword } from 'src/common/decorators/strong-password.decorator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  @StrongPassword()
  password: string;
}