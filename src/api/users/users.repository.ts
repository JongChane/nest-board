import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

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
  async idDuplicateCheck(account: string) {
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
}
