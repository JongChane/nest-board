import { Module } from '@nestjs/common';
import { BoardsService } from './services/boards.service';
import { BoardsController } from './controllers/boards.controller';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
