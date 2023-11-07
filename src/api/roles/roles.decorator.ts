import { ROLE } from '@prisma/client';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: ROLE[]) =>
  SetMetadata(ROLES_KEY, roles);
