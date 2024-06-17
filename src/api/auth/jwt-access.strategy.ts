import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { JwtAdminDto, JwtUserDto } from './dto/jwt-dto';

//PassportStrategy(인증방식, 이름)
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  //검증이 완료되면 request.user 객체에 payload값 저장후 리턴
  async validate(payload: JwtAdminDto | JwtUserDto) {
    if (payload.roles === 'admin') {
      const sessionId = await this.cacheManager.get(payload.account + 'admin');
      if (!sessionId || sessionId !== payload.session_id) {
        //payload에 있는 sessionId값과 맵객체로 저장해둔 sessionId값 비교후 같지 않을 경우 401 에러 발생시킴.
        throw new UnauthorizedException({
          message: '중복 로그인이 감지되었습니다.',
          customCode: 'DUPLICATE_LOGIN',
        });
      }
    } else if (payload.roles === 'user') {
      const sessionId = await this.cacheManager.get(payload.account);
      console.log(payload);
      console.log('세션아이디' + sessionId);
      console.log('페이로드' + payload.session_id);
      if (!sessionId || sessionId !== payload.session_id) {
        //payload에 있는 sessionId값과 맵객체로 저장해둔 sessionId값 비교후 같지 않을 경우 401 에러 발생시킴.
        throw new UnauthorizedException({
          message: '중복 로그인이 감지되었습니다.',
          customCode: 'DUPLICATE_LOGIN',
        });
      }
    }
    if (payload.roles && payload.roles.includes('user')) {
      return {
        user_idx: (payload as JwtUserDto).user_idx,
        account: payload.account,
        name: payload.name,
        roles: payload.roles,
        session_id: payload.session_id,
      };
    } else if (payload.roles && payload.roles.includes('admin')) {
      return {
        admin_idx: (payload as JwtAdminDto).admin_idx,
        account: payload.account,
        name: payload.name,
        roles: payload.roles,
        session_id: payload.session_id,
      };
    }
  }
}
