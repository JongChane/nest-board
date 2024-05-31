import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @ApiProperty({
    example: 'test',
    description: '회원 아이디, 4~16자리 사이의 영문이나 숫자',
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 16)
  @Matches(/^[A-Za-z0-9]+$/, {
    message: '아이디는 4~16자리 사이의 영문이나 숫자를 포함해야 합니다.',
  })
  account: string;

  @ApiProperty({
    example: 'string',
    description:
      '회원 비밀번호, 4~20자리, 최소 하나의 영문과 숫자, 그리고 허용되는 특수문자만',
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]+$/, {
    message:
      '비밀번호는 4~20자리, 최소 하나의 영문과 숫자, 그리고 허용되는 특수문자만을 포함해야 합니다.',
  })
  password: string;

  @ApiProperty({
    example: '유종찬',
    description: '이름, 한글 또는 영문',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @Matches(/^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/, {
    message: '이름은 한글 또는 영문만 허용됩니다.',
  })
  name: string;

  @ApiProperty({
    example: '메일',
    description: '메일',
  })
  @Matches(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    {
      message: '유효한 이메일 형식이 아닙니다.',
    },
  )
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  email: string;

  @ApiProperty({
    example: '01012341234',
    description: '전화번호',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{4})([0-9]{4})$/, {
    message: '유효한 전화번호 형식이 아닙니다.',
  })
  phone: string;
}
