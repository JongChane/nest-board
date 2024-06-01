import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { roll } from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(roll),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
