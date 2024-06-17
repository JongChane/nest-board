import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { roll } from './config/config';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheConfig } from './config/cache-config';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    CacheModule.registerAsync({ isGlobal: true, useClass: CacheConfig }),
    TypeOrmModule.forRoot(roll),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
