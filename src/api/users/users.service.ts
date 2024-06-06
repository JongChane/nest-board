import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}
  //유저 회원가입
  async register(inputData: CreateUserDto) {
    try {
      const duplicateCheck = await this.idDuplicateCheck(inputData.account);
      if (duplicateCheck === '중복된 아이디입니다.')
        throw new BadRequestException('중복된 아이디입니다.');
      //비밀번호 암호화
      const salt = await bcrypt.genSalt();
      inputData.password = await bcrypt.hash(inputData.password, salt);
      const user = plainToClass(User, inputData);
      const result = await this.usersRepo.register(user);
      if (!result) throw new BadRequestException('회원가입에 실패하였습니다.');
    } catch (e) {
      throw e;
    }
  }
  //중복 아이디 체크
  async idDuplicateCheck(account: string) {
    try {
      const duplicated = await this.usersRepo.idDuplicateCheck(account);
      if (duplicated === null) return '사용 가능한 아이디입니다.';
      else return '중복된 아이디입니다.';
    } catch (e) {
      throw e;
    }
  }
}
