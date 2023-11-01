import { Prisma, ROLE, ACCOUNT_STATUS, User } from '@prisma/client';
import { PrismaService } from './../database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { hashPassword } from 'src/common/helper/hash-password.helper';
import { FindUserByDto } from './dto/find-user-by.dto';
import { USER_NOT_FOUND_EXCEPTION } from './constants/user.constants';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }
  async create({ email, password }: SignUpDto) {
    const login = email.replace(/@(.*)$/, '')
    const hash = await hashPassword(password)
    return await this.prismaService.user.create({
      data: {
        email,
        login,
        hash,
        role: ROLE.USER,
        accountStatus: ACCOUNT_STATUS.PENDING
      }
    })
  }

  async findBy({email}: FindUserByDto) {
    const user =  await this.prismaService.user.findFirst({where: {email}})

    if( !user ) {
      throw new NotFoundException(USER_NOT_FOUND_EXCEPTION.MISSING_USER)
    }

    return user
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findById(id: number) {
    const user = await this.prismaService.user.findFirst({
      include: { UserProfile: true },
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_EXCEPTION.MISSING_USER);
    }

    return user;
  }

  async updateProperty(
    id: number,
    { accountStatus, email, password, role }: UpdateUserDto,
  ) {
    await this.findById(id);

    const updateData: Prisma.UserUpdateInput = {
      accountStatus,
      email,
      role,
    };

    if (password) {
      updateData['hash'] = await hashPassword(password);
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        ...updateData,
      },
    });

    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
