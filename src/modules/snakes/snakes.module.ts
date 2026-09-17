import { Module } from '@nestjs/common';
import { SnakesService } from './snakes.service';
import { SnakesController } from './snakes.controller';

import { IdentificationModule } from '../identification/identification.module';

@Module({
  imports: [IdentificationModule],
  controllers: [SnakesController],
  providers: [SnakesService],
  exports: [SnakesService],
})
export class SnakesModule {}
