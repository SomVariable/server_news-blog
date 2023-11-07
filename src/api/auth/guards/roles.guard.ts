import { ROLES_KEY } from './../../roles/roles.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const httpRequest = context.switchToHttp().getRequest();
    const user = httpRequest.user;

    if (user && user?.id === -1) return null;
    const isOk = requiredRoles.some((r) => user?.role === r);

    return isOk;
  }
}
