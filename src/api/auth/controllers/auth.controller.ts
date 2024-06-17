import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  Res,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';
import { Request, Response } from 'express';

@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('AUTH')
  @ApiOperation({
    summary: '유저 로그인',
  })
  @Post()
  async login(
    @Body() inputData: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const token = await this.authService.login(inputData);
      const refreshToken = token.refreshToken;
      const accessToken = token.accessToken;
      res.cookie('refreshToken', 'Bearer ' + refreshToken, {
        httpOnly: true,
        secure: true,
      });
      return { accessToken };
    } catch (e) {
      console.log(e.stack || e.message);
      throw new HttpException(e.message, e.status || 500);
    }
  }

  @ApiTags('AUTH')
  @Post('/logout')
  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃',
  })
  signOut(@Res({ passthrough: true }) res: Response) {
    try {
      res.clearCookie('refreshToken');
      return '로그아웃 되었습니다.';
    } catch (e) {
      console.log(e.stack || e.message);
      throw new HttpException(e.message, e.status || 500);
    }
  }
}
