import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'yujc',
    description: '회원 아이디',
  })
  account: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'qwer1234',
    description: '회원 비밀번호',
  })
  password: string;
}
