import { Body, Controller, Get, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { VerifyDto } from './dto/verify.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from '../jwt-helper/types/jwt-helper.types';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignUpOkDto } from './dto/ok-response/sign-up-ok.dto';
import { VerifyOkDto } from './dto/ok-response/verify-ok.dto';
import { SignInOkDto } from './dto/ok-response/sign-in-ok.dto';
import { LogoutOkDto } from './dto/ok-response/logout-ok.dto';
import { AuthBadRequestDto } from './dto/auth-bad-request.dto';
import { UserInterceptor } from '../user/interceptors/user.interceptor';
import { DataToJsonInterceptor } from 'src/common/interceptors/data-to-json.interceptor';
import { BaseFormatInterceptor } from 'src/common/interceptors/base-format.interceptor';
import { DeviceType } from 'src/common/decorators/device-type.decorator';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';


@Controller('auth')
@ApiTags('auth')
@ApiBadRequestResponse({type: AuthBadRequestDto})
@UseInterceptors(DataToJsonInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // sign-up
  @Post('sign-up')
  @ApiOkResponse({type: SignUpOkDto})
  @UseInterceptors(UserInterceptor)
  async signUp(
    @Body() dto: SignUpDto,
    @DeviceType() deviceType: string
  ) {
    return await this.authService.signUp(dto, deviceType)
  }

  @Post('sign-up/verify')
  @ApiOkResponse({type: VerifyOkDto})
  @UseInterceptors( BaseFormatInterceptor )
  async verifySignUp(
    @Body() dto: VerifyDto,
    @DeviceType() deviceType: string
  ) {
    return await this.authService.signUpVerify(dto, deviceType)
  }
  
  // sign-in
  @Post('sign-in')
  @ApiOkResponse({type: SignInOkDto})
  @UseInterceptors(UserInterceptor)
  async signIn(
    @Body() dto: SignInDto, 
    @DeviceType() deviceType:  string
  ) {
    return await this.authService.signIn(dto, deviceType)
  }

  @Post('sign-in/verify')
  @ApiOkResponse({type: VerifyOkDto})
  @UseInterceptors( BaseFormatInterceptor )
  async verifySignIn(
    @Body() {email, verifyCode}: VerifyDto,
    @DeviceType() deviceType: string
  ) {
    const tokens = await this.authService.verification(
      verifyCode,
      email,
      deviceType,
    );

    return tokens;
  }
  
  // logout
  @Patch('logout')
  @ApiBearerAuth()
  @ApiOkResponse({type: LogoutOkDto})
  @UseInterceptors( BaseFormatInterceptor )
  @UseGuards(AccessJwtAuthGuard)
  async logout(
    @UserParam() {id}: jwtType,
    @DeviceType() deviceType: string
  ) {
    return await this.authService.logout(id, deviceType)
  }

}
