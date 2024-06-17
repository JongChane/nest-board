import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LoginUserDto } from 'src/api/auth/dto/login-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}
  async register(inputData: User) {
    try {
      const result = await this.usersRepo.save(inputData);
      return result;
    } catch (error) {
      console.log(error.stack || error.message);
      throw error;
    }
  }
  async idCheck(account: string) {
    try {
      const result = await this.usersRepo.findOne({
        where: {
          account,
        },
      });
      return result;
    } catch (error) {
      console.log(error.stack || error.message);
      throw error;
    }
  }
  async loginCheck(account: string) {
    try {
      const result = await this.usersRepo
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.account = :account', { account })
        .getRawOne();
      return result;
    } catch (error) {
      console.log(error.stack || error.message);
      throw error;
    }
  }
}
