import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'admin',
    description: '관리자 아이디',
  })
  account: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'qwer1234',
    description: '관리자 비밀번호',
  })
  password: string;
}
