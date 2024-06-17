import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (roles: string[], level?: number) => {
  return SetMetadata(ROLES_KEY, { roles, level }); //역할 admin, user로 구분, 관리자의 경우 level 설정
};
