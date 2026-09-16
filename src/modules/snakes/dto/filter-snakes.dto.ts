import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { DangerLevel } from '@prisma/client';

export class FilterSnakesDto {
  @ApiPropertyOptional({ description: 'Filter by venomous status' })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  @IsBoolean()
  isVenomous?: boolean;

  @ApiPropertyOptional({
    enum: DangerLevel,
    description: 'Filter by danger level',
  })
  @IsOptional()
  @IsEnum(DangerLevel)
  dangerLevel?: DangerLevel;

  @ApiPropertyOptional({
    description: 'Search query across scientific name and common names',
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
