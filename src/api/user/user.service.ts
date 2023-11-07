import { Prisma, ROLE, ACCOUNT_STATUS, User } from '@prisma/client';
import { PrismaService } from './../database/prisma.service';
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { hashPassword } from 'src/common/helper/hash-password.helper';
import { FindUserByDto } from './dto/find-user-by.dto';
import { USER_NOT_FOUND_EXCEPTION, UserProfileInclude } from './constants/user.constants';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger()
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create({ email, password, ...data }: SignUpDto) {
    this.logger.verbose(`UserService. create. Input data email: ${email}, password: ${password}, other data: ${data}`)
    const login = email.replace(/@(.*)$/, '')
    const hash = await hashPassword(password)
    const user = await this.prismaService.user.create({
      data: {
        email,
        login,
        hash,
        role: ROLE.USER,
        accountStatus: ACCOUNT_STATUS.PENDING
      }
    })

    this.logger.verbose(`UserService. create. Output data user: ${JSON.stringify(user)}`)
    return user
  }

  async findBy({ email, ...data}: FindUserByDto) {
    this.logger.verbose(`UserService. findBy. Input data email: ${email}, other data: ${data}`)
    const user = await this.prismaService.user.findFirst({ where: { email } })

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_EXCEPTION.MISSING_USER)
    }

    this.logger.verbose(`UserService. findBy. Output data user: ${JSON.stringify(user)}`)
    return user
  }

  async findAll({skip, take}: QueryPaginationParam) {
    this.logger.verbose(`UserService. findAll. Input data skip: ${skip}, take: ${take}`)
    
    const users = await this.prismaService.user.findMany({
      skip, take
    });

    this.logger.verbose(`UserService. findAll. Output data users: ${JSON.stringify(users)}`)
    return users
  }

  async findAllWithFullData({skip, take}: QueryPaginationParam) {
    this.logger.verbose(`UserService. findAllWithFullData. Input data skip: ${skip}, take: ${take}`)
    const users = await this.prismaService.user.findMany({
      include: {...UserProfileInclude,},
      skip, take
    })

    this.logger.verbose(`UserService. findAllWithFullData. Output data users: ${JSON.stringify(users)}`)
    return users
  }

  async findByIdWithFullData(id: number) {
    this.logger.verbose(`UserService. findByIdWithFullData. Input data skip: ${id}`)
    const user = await this.prismaService.user.findUnique({
      include: {
        ...UserProfileInclude,
      },
      where: { id }
    })

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_EXCEPTION.MISSING_USER)
    }

    this.logger.verbose(`UserService. findByIdWithFullData. Output data users: ${JSON.stringify(user)}`)
    return user
  }

  async findOne(id: number) {
    this.logger.verbose(`UserService. findOne. Input data skip: ${id}`)
    const user = await this.prismaService.user.findUnique( {where: {id}} )

    if(!user) {
      throw new NotFoundException(USER_NOT_FOUND_EXCEPTION.MISSING_USER)
    }

    this.logger.verbose(`UserService. findOne. Output data users: ${JSON.stringify(user)}`)
    return user;
  }

  async findById(id: number) {
    this.logger.verbose(`UserService. findById. Input data skip: ${id}`)

    const user = await this.prismaService.user.findFirst({
      include: { UserProfile: true },
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_EXCEPTION.MISSING_USER);
    }

    this.logger.verbose(`UserService. findById. Input data skip: ${JSON.stringify(user)}`)

    return user;
  }

  async updateProperty(
    id: number,
    data: UpdateUserDto,
  ) {
    const {accountStatus, email, password, role } = data
    this.logger.verbose(`UserService. updateProperty. Input data skip: ${id}, data is: ${data}`)

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

    this.logger.verbose(`UserService. updateProperty. Output data skip: ${id}, updatedUser is: ${updatedUser}`)
    return updatedUser;
  }

  async remove(id: number) {
    this.logger.verbose(`UserService. remove. Input data skip: ${id}`)
    const user = await this.prismaService.user.delete({
      where: {id}
    }) 

    if(!user) {
      throw new NotFoundException(USER_NOT_FOUND_EXCEPTION.MISSING_USER)
    }

    this.logger.verbose(`UserService. remove. Output data skip: ${user}`)
    return user;
  }
}
