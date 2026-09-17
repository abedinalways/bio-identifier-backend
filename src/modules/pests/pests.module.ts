import { Module } from '@nestjs/common';
import { PestsService } from './pests.service';
import { PestsController } from './pests.controller';

import { IdentificationModule } from '../identification/identification.module';

@Module({
  imports: [IdentificationModule],
  controllers: [PestsController],
  providers: [PestsService],
  exports: [PestsService],
})
export class PestsModule {}
