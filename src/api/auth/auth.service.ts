import { JwtHelperService } from './../jwt-helper/jwt-helper.service';
import { VerificationService } from './../verification/verification.service';
import { KvStoreService } from './../kv-store/kv-store.service';
import { UserService } from './../user/user.service';
import { PrismaService } from './../database/prisma.service';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { VerifyDto } from './dto/verify.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ROLE, ACCOUNT_STATUS } from '@prisma/client'
import { AccessJwtConfig, RefreshJwtConfig } from 'src/config/jwt.config';
import * as bcrypt from 'bcrypt'
import { AUTH_BAD_REQUEST_MESSAGE } from './constants/auth.constants';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly kvStoreService: KvStoreService,
        private readonly verificationService: VerificationService,
        private readonly jwtHelperService: JwtHelperService
    ) { }

    //sign-up
    async signUp(dto: SignUpDto, deviceType: string) {
        this.logger.verbose(`AuthService. signUp function. Input data is: ${JSON.stringify(dto)}, ${deviceType}`)

        const user = await this.userService.create(dto)
        const sessionKey = this.kvStoreService.generateSessionKey(user.id, deviceType);
        this.logger.verbose(`AuthService. signUp function. Input data is: ${sessionKey}`)
        await this.kvStoreService.createSession({ id: sessionKey });
        const verificationProps = await this.sendVerification(dto, sessionKey);

        this.logger.verbose(`AuthService. SignUp function. Output data is: ${JSON.stringify(user)}, ${JSON.stringify(verificationProps)}`)
        return { user, verificationProps }
    }

    async signUpVerify(dto: VerifyDto, deviceType: string) {
        const { email, verifyCode } = dto
        this.logger.verbose(`AuthService. signUpVerify function. Input data is: ${JSON.stringify(dto)}, ${deviceType}`)

        const tokens = await this.verification(
            verifyCode,
            email,
            deviceType,
        );

        await this.activeUserStatus(email);

        this.logger.verbose(`AuthService. signUpVerify function. Output data is: ${JSON.stringify(tokens)}`)
        return tokens;
    }

    //sign-in
    async signIn(dto: SignUpDto, deviceType: string) {
        const { email, password } = dto
        this.logger.verbose(`AuthService. signIn function. Input data is: ${JSON.stringify(dto)}`)
        const user = await this.validateUser(email, password);
        const sessionKey = this.kvStoreService.generateSessionKey(user.id, deviceType);
        const verificationProps = await this.sendVerification(dto, sessionKey);

        this.logger.verbose(`AuthService. signIn function. Output data is: ${JSON.stringify(user)}`)
        return {user, verificationProps};
    }

    async logout(id: number, deviceType: string) {
        this.logger.verbose(`AuthService. logout function. Input data is: ${id}, ${deviceType}`)
        const sessionKey = this.kvStoreService.generateSessionKey(id, deviceType);

        const session = await this.kvStoreService.blockSession(sessionKey);

        this.logger.verbose(`AuthService. logout function. Output data is: ${JSON.stringify(session)}`)
        return session
    }

    // verification 
    async sendVerification(dto: SignUpDto, sessionKey: string) {
        this.logger.verbose(`AuthService. sendSignUpVerification function. Input data is: ${JSON.stringify(dto)}, ${sessionKey}`)
        const verifyCode = this.verificationService.generateVerificationCode();
        // Mailers trial version is bad, so i just return verify data to front 
        const verifyData = await this.verificationService.sendVerificationCode(
            dto,
            sessionKey,
            verifyCode,
        );

        this.logger.verbose(`AuthService. sendSignUpVerification function. Output data is: ${JSON.stringify(verifyData)}}`)
        return verifyData
    }

    async verifyUser(verifyCode: string, sessionKey: string) {
        this.logger.verbose(`AuthService. verifyUser function. Input data is: ${verifyCode}, ${sessionKey}`)

        const isValid = await this.verificationService.validateVerifyCode(
            verifyCode,
            sessionKey,
        );

        this.logger.verbose(`AuthService. verifyUser function. Output data is: ${isValid}`)

        return isValid
    }

    async verification(verifyCode: string, email: string, deviceType: string) {
        this.logger.verbose(`AuthService. verification function. Input data is: ${verifyCode}, ${email}, ${deviceType}`)

        const { id } = await this.userService.findBy({ email });
        const session = this.kvStoreService.generateSessionKey(id, deviceType);
        await this.verifyUser(verifyCode, session);
        await this.kvStoreService.activeSession(session);
        const tokens = await this.generateTokens(session, email);

        this.logger.verbose(`AuthService. verification function. Input data is: ${JSON.stringify(tokens)}`)

        return tokens;
    }

    async generateTokens(sessionKey: string, email: string) {
        this.logger.verbose(`AuthService. generateTokens function. Input data is: ${sessionKey}, ${email}`)

        const user = await this.userService.findBy({ email });

        const jwtToken = await this.jwtHelperService.generateToken(
            user,
            sessionKey,
            AccessJwtConfig(),
        );
        const refreshToken = await this.jwtHelperService.generateToken(
            user,
            sessionKey,
            RefreshJwtConfig(),
        );

        const tokens = { jwtToken, refreshToken }

        this.logger.verbose(`AuthService. generateTokens function. Output data is: ${sessionKey}, ${email}`)

        return tokens;
    }

    // additional methods
    async activeUserStatus(email: string) {
        this.logger.verbose(`AuthService. activeUserStatus function. Input data is: ${email}`)

        const { id } = await this.userService.findBy({ email });

        const user = await this.userService.updateProperty(id, {
            accountStatus: ACCOUNT_STATUS.ACTIVE,
        });

        this.logger.verbose(`AuthService. activeUserStatus function. Output data is: ${user}`)
        return user
    }

    async validateUser(email: string, password: string) {
        this.logger.verbose(`start validate user. input data is: email: ${email} password: ${password}`)
        const user = await this.userService.findBy({ email });

        const isCompare = await bcrypt.compare(password, user.hash);
        if (!isCompare) {
            throw new BadRequestException(AUTH_BAD_REQUEST_MESSAGE.WRONG_DATA);
        }

        this.logger.verbose(`start validate user. Output data is: ${JSON.stringify(user)} `)
        return user;
    }
}
