import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { HospitalsService } from './hospitals.service';
import {
  FilterHospitalsDto,
  NearestHospitalsDto,
} from './dto/nearest-hospitals.dto';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

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

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add new antivenom emergency hospital (Admin only)',
  })
  @ApiResponse({ status: 201, description: 'Hospital created successfully' })
  async create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalsService.create(createHospitalDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update hospital information (Admin only)' })
  @ApiResponse({ status: 200, description: 'Hospital updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateHospitalDto>,
  ) {
    return this.hospitalsService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove hospital entry (Admin only)' })
  @ApiResponse({ status: 200, description: 'Hospital deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.hospitalsService.remove(id);
  }
}
