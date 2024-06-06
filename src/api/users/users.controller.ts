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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { ApiTags } from '@nestjs/swagger';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
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

  @Get('id-check/:account')
  async idDuplicateCheck(@Param('account') account: string) {
    try {
      const result = await this.usersService.idDuplicateCheck(account);
      return result;
    } catch (e) {
      console.log(e.stack || e.message);
      throw new HttpException(e.message, e.status || 500);
    }
  }
}
