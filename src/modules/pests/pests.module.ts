import { Module } from '@nestjs/common';
import { PestsService } from './pests.service';
import { PestsController } from './pests.controller';

@Module({
  controllers: [PestsController],
  providers: [PestsService],
  exports: [PestsService],
})
export class PestsModule {}
