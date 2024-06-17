import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    //reflector는 메타데이터 조회를 위해 사용
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<{ roles: string[]; level?: number }>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!roles) {
      return true; // roles 데코레이터에 지정해둔 메타 데이터 없으면 모든 요청 허용
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (
      roles.roles &&
      !roles.roles.some((role) => user.roles?.includes(role))
    ) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }

    if (roles.level && user.level < roles.level) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }
    return true;
  }
}
