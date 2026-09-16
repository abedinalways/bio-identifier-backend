import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HospitalsService } from './hospitals.service';
import {
  FilterHospitalsDto,
  NearestHospitalsDto,
} from './dto/nearest-hospitals.dto';

@ApiTags('Emergency Antivenom Hospitals')
@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get('nearest')
  @ApiOperation({
    summary:
      'Find nearest antivenom-equipped hospitals using GPS coordinates (Haversine formula)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of nearest hospitals sorted by distance in km',
  })
  async findNearest(@Query() query: NearestHospitalsDto) {
    return this.hospitalsService.findNearest(query);
  }

  @Get()
  @ApiOperation({
    summary:
      'Get all hospitals with optional country, division, and district filters',
  })
  @ApiResponse({ status: 200, description: 'List of emergency hospitals' })
  async findAll(@Query() query: FilterHospitalsDto) {
    return this.hospitalsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single hospital details by ID' })
  @ApiResponse({ status: 200, description: 'Hospital details' })
  @ApiResponse({ status: 404, description: 'Hospital not found' })
  async findOne(@Param('id') id: string) {
    return this.hospitalsService.findOne(id);
  }
}
