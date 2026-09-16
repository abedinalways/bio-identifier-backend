import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CalculateDosageDto {
  @ApiProperty({ example: 'mango-hopper', description: 'ID of target pest' })
  @IsString()
  @IsNotEmpty()
  pestId: string;

  @ApiProperty({ example: 'mh-chem', description: 'ID of treatment protocol' })
  @IsString()
  @IsNotEmpty()
  treatmentId: string;

  @ApiPropertyOptional({
    example: 100,
    description: 'Direct spray water volume in liters',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  waterLiters?: number;

  @ApiPropertyOptional({
    example: 1.5,
    description: 'Land area in acres (if water volume not directly provided)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  landAreaAcre?: number;
}
