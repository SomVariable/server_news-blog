import { SetMetadata } from '@nestjs/common';

//replease
enum Role {}

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: Role[]) =>
  SetMetadata(ROLES_KEY, roles);
