import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { IdentificationService } from './identification.service';
import { IdentifyQueryDto } from './dto/identify.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('AI Specimen Identification')
@Controller('identify')
export class IdentificationController {
  constructor(private readonly identificationService: IdentificationService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary:
      'Upload specimen photo for Gemini Vision AI species identification and clinical analysis',
  })
  @ApiResponse({
    status: 200,
    description:
      'Species diagnosis, danger categorization, and clinical guidance',
  })
  async identifySpecimen(
    @UploadedFile() file: Express.Multer.File,
    @Body() metadata: IdentifyQueryDto,
  ) {
    return this.identificationService.identifySpecimen(file, metadata);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get diagnostic history for authenticated user' })
  @ApiResponse({ status: 200, description: 'Identification history log' })
  async getHistory(@GetUser('id') userId: string) {
    return this.identificationService.getHistory(userId);
  }
}
