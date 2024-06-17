import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/api/users/db/users.repository';
import { LoginUserDto } from '../dto/login-user.dto';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { JwtAdminDto, JwtUserDto } from '../dto/jwt-dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  //로그인 검증 로직
  async login(inputData: LoginUserDto) {
    try {
      const session_id = v4();
      const dbUser = await this.usersRepo.loginCheck(inputData.account);
      if (!dbUser)
        throw new BadRequestException('아이디 혹은 비밀번호를 확인해주세요.');
      const valid = await bcrypt.compare(inputData.password, dbUser.password);
      if (!valid)
        throw new BadRequestException('아이디 혹은 비밀번호를 확인해주세요.');
      await this.cacheManager.set(inputData.account, session_id);
      console.log(await this.cacheManager.get(inputData.account));
      const payload: JwtUserDto = {
        user_idx: dbUser.user_idx,
        account: dbUser.account,
        name: dbUser.name,
        roles: 'user',
        session_id,
      };
      const accessToken = await this.accessToken(payload);
      const refreshToken = await this.refreshToken(payload);
      const result = { accessToken, refreshToken };
      return result;
    } catch (e) {
      throw e;
    }
  }

  //액세스 토큰 발급
  async accessToken(payload: JwtAdminDto | JwtUserDto) {
    try {
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '1h',
      });
      return token;
    } catch (e) {
      throw e;
    }
  }
  //리프레시 토큰 발급
  async refreshToken(payload: JwtAdminDto | JwtUserDto) {
    try {
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '1d',
      });
      return token;
    } catch (e) {
      throw e;
    }
  }
}
