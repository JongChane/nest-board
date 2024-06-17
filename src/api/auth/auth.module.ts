import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtAccessStrategy } from './jwt-access.strategy';
import { JwtRefreshStrategy } from './jwt-refresh-strategy';

@Module({
  imports: [JwtModule, UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
