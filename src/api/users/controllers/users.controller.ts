import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseInterceptors,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/api/auth/roles.decorator';
import { RolesGuard } from 'src/api/auth/roles.guard';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@ApiBearerAuth()
@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //회원가입
  @Post('register')
  async register(@Body() inputData: CreateUserDto) {
    try {
      const result = await this.usersService.register(inputData);
      return result;
    } catch (e) {
      console.log(e.stack || e.message);
      throw new HttpException(e.message, e.status || 500);
    }
  }
  //아이디 중복체크
  @UseGuards(AuthGuard('access'), RolesGuard)
  @Roles('user')
  @Get('id-check/:account')
  async idDuplicateCheck(@Param('account') account: string) {
    try {
      const result = await this.usersService.idCheck(account);
      return result;
    } catch (e) {
      console.log(e.stack || e.message);
      throw new HttpException(e.message, e.status || 500);
    }
  }
}
