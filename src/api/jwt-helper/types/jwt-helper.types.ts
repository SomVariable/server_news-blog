import { ROLE } from '@prisma/client';

export type jwtReturnType = {
  jwtToken: string,
  refreshToken: string,
}

export type jwtType = {
  email: string;
  id: number;
  role: ROLE;
  iat: number;
  exp: number;
  sessionKey: string;
};
