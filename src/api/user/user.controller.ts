import { ROLE } from '@prisma/client';
import { jwtType } from './../jwt-helper/types/jwt-helper.types';
import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DataToJsonInterceptor } from 'src/common/interceptors/data-to-json.interceptor';
import { UserInterceptor } from './interceptors/user.interceptor';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLES_KEY, RolesDecorator } from '../roles/roles.decorator';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';
import { UserOkDto } from './dto/ok-response/user-ok.dto';
import { UserWithFullDataOkDto } from './dto/ok-response/user-with-full-data-ok.dto';
import { UsersOkDto } from './dto/ok-response/users-ok.dto';
import { UsersWithFullDataOkDto } from './dto/ok-response/users-with-full-data-ok.dto';
import { UsersInterceptor } from './interceptors/users.interceptor';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AccessJwtAuthGuard)
@UseInterceptors(DataToJsonInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('self')
  @ApiOkResponse({ type: UserOkDto })
  @UseInterceptors(UserInterceptor)
  async getSelf(
    @UserParam() { id }: jwtType) {
    const user = await this.userService.findById(id);

    return { user }
  }

  @Get('self/full-data')
  @ApiOkResponse({ type: UserWithFullDataOkDto })
  @UseInterceptors(UserInterceptor)
  async getSelfWithFullData(
    @UserParam() { id }: jwtType
  ) {
    const user = await this.userService.findByIdWithFullData(id)

    return { user }
  }

  @Patch('self')
  @ApiOkResponse({ type: UserOkDto })
  @UseInterceptors(UserInterceptor)
  async updateSelf(
    @UserParam() { id }: jwtType,
    @Body() data: UpdateUserDto,
  ) {
    const user = await this.userService.updateProperty(id, data)

    return { user }
  }

  @Delete('self')
  @ApiOkResponse({ type: UserOkDto })
  @UseInterceptors(UserInterceptor)
  async remove(
    @UserParam() { id }: jwtType) {
    const user = await this.userService.remove(id);

    return { user }
  }

  @Get('other')
  @ApiOkResponse({ type: UsersOkDto })
  @UseInterceptors( UsersInterceptor )
  async findAll(
    @Query() pagination: QueryPaginationParam
  ) {
    const users = await this.userService.findAll(pagination);

    return { users }
  }

  @Get('other/full-data')
  @ApiOkResponse({ type: UsersWithFullDataOkDto })
  @UseInterceptors( UsersInterceptor )
  async findAllWithFullData(
    @Query() pagination: QueryPaginationParam) {
    const users = await this.userService.findAllWithFullData(pagination);

    return { users }
  }

  @Get('other/:id')
  @ApiOkResponse({ type: UserOkDto })
  @UseInterceptors(UserInterceptor)
  async findUser(
    @Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id)

    return { user }
  }

  @Get('other/:id/full-data')
  @ApiOkResponse({ type: UserWithFullDataOkDto })
  @UseInterceptors(UserInterceptor)
  async findUserWithFullData(
    @Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findByIdWithFullData(id)

    return { user }
  }

  @Patch('other/:id')
  @ApiOkResponse({ type: UserOkDto })
  @RolesDecorator(ROLE.ADMIN)
  @UseGuards(RolesGuard, AccessJwtAuthGuard)
  @UseInterceptors(UserInterceptor)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto) {
    const user = await this.userService.updateProperty(id, data)

    return { user }
  }

  @Delete('other/:id')
  @ApiOkResponse({ type: UserOkDto })
  @UseInterceptors(UserInterceptor)
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = await this.userService.remove(id)

    return { user }
  }
  
}

