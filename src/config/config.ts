import * as dotenv from 'dotenv';
import { Board } from 'src/api/boards/entities/board.entity';
import { User } from 'src/api/users/entities/user.entity';
dotenv.config({ path: '.env' });

export const roll = {
  type: 'mysql' as const,
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PW,
  database: 'test',
  entities: [User, Board],
  synchronize: true,
};
