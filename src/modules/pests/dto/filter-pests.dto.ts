import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PestCategory, PestSeverity } from '@prisma/client';

export class FilterPestsDto {
  @ApiPropertyOptional({
    enum: PestCategory,
    description: 'Filter by category (crop_pest or stinging_insect)',
  })
  @IsOptional()
  @IsEnum(PestCategory)
  category?: PestCategory;

  @ApiPropertyOptional({
    description: 'Filter by crop name (e.g. mango, rice, litchi)',
  })
  @IsOptional()
  @IsString()
  crop?: string;

  @ApiPropertyOptional({
    enum: PestSeverity,
    description: 'Filter by severity level',
  })
  @IsOptional()
  @IsEnum(PestSeverity)
  severity?: PestSeverity;

  @ApiPropertyOptional({
    description: 'Search text in scientific name or pest ID',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Page number (1-based)', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 20;
}
