import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EmergencyService } from './emergency.service';
import { CreateSosCallDto } from './dto/sos-call.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Emergency Hotline & SOS Dispatch')
@Controller('emergency')
export class EmergencyController {
  constructor(private readonly emergencyService: EmergencyService) {}

  @Get('hotlines')
  @ApiOperation({
    summary:
      'Get verified emergency and poison control hotlines for South Asia (BD, IN, PK)',
  })
  @ApiResponse({
    status: 200,
    description: 'Regional emergency and poison control hotlines directory',
  })
  getHotlines() {
    return this.emergencyService.getHotlines();
  }

  @Post('sos')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary:
      'Trigger and record emergency SOS dispatch with GPS coordinates and victim notes',
  })
  @ApiResponse({
    status: 201,
    description: 'Emergency SOS dispatch recorded successfully',
  })
  async logSosCall(
    @Body() dto: CreateSosCallDto,
    @GetUser('id') userId?: string,
  ) {
    return this.emergencyService.logSosCall(dto, userId);
  }

  @Get('logs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.DOCTOR)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Retrieve recent emergency SOS dispatch logs (Admin and Doctor only)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of emergency dispatch records with hospital information',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getSosLogs() {
    return this.emergencyService.getSosLogs();
  }
}
