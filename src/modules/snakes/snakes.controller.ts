import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { SnakesService } from './snakes.service';
import { FilterSnakesDto } from './dto/filter-snakes.dto';
import { CreateSnakeDto } from './dto/create-snake.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Snakes & Antivenom')
@Controller('snakes')
export class SnakesController {
  constructor(private readonly snakesService: SnakesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all snakes with pagination, filters, and search',
  })
  @ApiResponse({ status: 200, description: 'List of snakes with metadata' })
  async findAll(@Query() query: FilterSnakesDto) {
    return this.snakesService.findAll(query);
  }

  @Get('venomous')
  @ApiOperation({
    summary: 'Get all venomous snake species requiring ASV alert',
  })
  @ApiResponse({ status: 200, description: 'List of venomous snakes' })
  async findVenomous() {
    return this.snakesService.findVenomous();
  }

  @Get('harmless')
  @ApiOperation({ summary: 'Get non-venomous / harmless snake species' })
  @ApiResponse({ status: 200, description: 'List of harmless snakes' })
  async findHarmless() {
    return this.snakesService.findHarmless();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get detailed species profile by ID or slug' })
  @ApiResponse({ status: 200, description: 'Detailed snake profile' })
  @ApiResponse({ status: 404, description: 'Snake not found' })
  async findOne(@Param('id') id: string) {
    return this.snakesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.DOCTOR)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create new snake species entry (Admin/Doctor only)',
  })
  @ApiResponse({ status: 201, description: 'Snake created successfully' })
  async create(@Body() createSnakeDto: CreateSnakeDto) {
    return this.snakesService.create(createSnakeDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.DOCTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update snake profile (Admin/Doctor only)' })
  @ApiResponse({ status: 200, description: 'Snake updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateSnakeDto>,
  ) {
    return this.snakesService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete snake entry (Admin only)' })
  @ApiResponse({ status: 200, description: 'Snake deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.snakesService.remove(id);
  }
}
