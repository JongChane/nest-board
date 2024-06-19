import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { JwtAdminDto, JwtUserDto } from './dto/jwt-dto';
import { Request } from 'express';
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const CookiesRefreshToken = request.cookies.refreshToken;
          if (!CookiesRefreshToken)
            throw new UnauthorizedException({
              message: '쿠키에 리프레시 토큰이 없습니다.',
              customCode: 'ref_error',
            });
          const RefreshToken = CookiesRefreshToken.replace('Bearer ', '');
          return RefreshToken;
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  //검증이 완료되면 request.user 객체에 payload값 저장후 리턴
  async validate(payload: JwtAdminDto | JwtUserDto) {
    if (payload.roles === 'admin') {
      const sessionId = await this.cacheManager.get(payload.account + 'admin');
      if (!sessionId || sessionId !== payload.session_id) {
        //payload에 있는 sessionId값과 맵객체로 저장해둔 sessionId값 비교후 같지 않을 경우 401 에러 발생시킴.
        throw new UnauthorizedException(
          '세션 정보가 유효하지 않습니다. 다시 로그인 하세요.',
        );
      }
    } else if (payload.roles === 'user') {
      const sessionId = await this.cacheManager.get(payload.account);
      if (!sessionId || sessionId !== payload.session_id) {
        //payload에 있는 sessionId값과 맵객체로 저장해둔 sessionId값 비교후 같지 않을 경우 401 에러 발생시킴.
        throw new UnauthorizedException(
          '세션 정보가 유효하지 않습니다. 다시 로그인 하세요.',
        );
      }
    }
    if (payload.roles && payload.roles.includes('user')) {
      return {
        user_id: (payload as JwtUserDto).user_id,
        account: payload.account,
        name: payload.name,
        roles: payload.roles,
        session_id: payload.session_id,
      };
    } else if (payload.roles && payload.roles.includes('admin')) {
      return {
        admin_id: (payload as JwtAdminDto).admin_id,
        account: payload.account,
        name: payload.name,
        roles: payload.roles,
        session_id: payload.session_id,
      };
    }
  }
}
