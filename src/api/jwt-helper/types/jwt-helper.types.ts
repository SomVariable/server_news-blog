// rep to Role from prisma
export type jwtType = {
  email: string;
  id: number;
  role: any;
  iat: number;
  exp: number;
  sessionKey: string;
};
