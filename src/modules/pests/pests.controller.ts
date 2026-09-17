import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PestsService } from './pests.service';
import { FilterPestsDto } from './dto/filter-pests.dto';
import { CalculateDosageDto } from './dto/calculate-dosage.dto';
import { PestCategory } from '@prisma/client';
import { IdentificationService } from '../identification/identification.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';

@ApiTags('Pests & Crop Remedies')
@Controller('pests')
export class PestsController {
  constructor(
    private readonly pestsService: PestsService,
    private readonly identificationService: IdentificationService,
  ) {}

  @Post('identify')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Identify agricultural pest specimen photo' })
  async identifyPest(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.identificationService.identifySpecimen(file, {
      ...body,
      domain: 'pest',
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Get all pests with filters (category, crop, severity, search)',
  })
  @ApiResponse({ status: 200, description: 'Paginated list of pests' })
  async findAll(@Query() query: FilterPestsDto) {
    return this.pestsService.findAll(query);
  }

  @Get('category/:category')
  @ApiOperation({
    summary: 'Get pests by category (crop_pest or stinging_insect)',
  })
  @ApiParam({ name: 'category', enum: PestCategory })
  @ApiResponse({ status: 200, description: 'List of pests in given category' })
  async findByCategory(@Param('category') category: PestCategory) {
    return this.pestsService.findByCategory(category);
  }

  @Get('crop/:crop')
  @ApiOperation({
    summary:
      'Get all pests affecting a specific crop (e.g. mango, rice, litchi)',
  })
  @ApiParam({ name: 'crop', example: 'mango' })
  @ApiResponse({ status: 200, description: 'List of pests targeting the crop' })
  async findByCrop(@Param('crop') crop: string) {
    return this.pestsService.findByCrop(crop);
  }

  @Post('calculate-dosage')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'Calculate calibrated pesticide dosage based on water volume or land acreage',
  })
  @ApiResponse({
    status: 200,
    description: 'Precise dosage calculation and safety instructions',
  })
  async calculateDosage(@Body() dto: CalculateDosageDto) {
    return this.pestsService.calculateDosage(dto);
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Get detailed pest profile with organic and chemical treatment protocols',
  })
  @ApiResponse({
    status: 200,
    description: 'Detailed pest and treatment profile',
  })
  @ApiResponse({ status: 404, description: 'Pest not found' })
  async findOne(@Param('id') id: string) {
    return this.pestsService.findOne(id);
  }
}
