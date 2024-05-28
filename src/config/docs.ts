import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .addCookieAuth('refreshToken')
  .addBearerAuth()
  .setTitle(`게시판 테스트`)
  .setDescription('게시판 테스트')
  .setVersion('1.0')
  .build();
