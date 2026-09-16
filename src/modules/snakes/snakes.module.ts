import { Module } from '@nestjs/common';
import { SnakesService } from './snakes.service';
import { SnakesController } from './snakes.controller';

@Module({
  controllers: [SnakesController],
  providers: [SnakesService],
  exports: [SnakesService],
})
export class SnakesModule {}
