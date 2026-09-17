import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PestCategory, PestSeverity, TreatmentType } from '@prisma/client';

export class CreateTreatmentDto {
  @ApiProperty({ enum: TreatmentType, example: TreatmentType.organic })
  @IsEnum(TreatmentType)
  type: TreatmentType;

  @ApiProperty({ example: 'Neem Kernel Extract Solution' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Azadirachtin 0.03% EC' })
  @IsString()
  @IsNotEmpty()
  activeIngredient: string;

  @ApiProperty({ example: 4.0 })
  @IsNumber()
  dosagePerLiter: number;

  @ApiProperty({ example: 'ml' })
  @IsString()
  @IsNotEmpty()
  dosageUnit: string;

  @ApiPropertyOptional({ example: ['Bio-Neem 3000', 'EcoGuard 10EC'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  commercialExamples?: string[];

  @ApiProperty({ example: 'Apply early morning when nymphs hatch' })
  @IsString()
  @IsNotEmpty()
  optimalTiming: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  preHarvestIntervalDays?: number;

  @ApiProperty({ example: 'Spray with protective visor and gloves' })
  @IsString()
  @IsNotEmpty()
  safetyInstructions: string;
}

export class CreatePestDto {
  @ApiPropertyOptional({ example: 'mango-hopper' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ example: 'Idioscopus clypealis' })
  @IsString()
  @IsNotEmpty()
  scientificName: string;

  @ApiProperty({ example: { en: 'Mango Leaf Hopper', bn: 'আমের হপার পোকা' } })
  @IsObject()
  commonNames: Record<string, string>;

  @ApiPropertyOptional({ enum: PestCategory, default: PestCategory.crop_pest })
  @IsOptional()
  @IsEnum(PestCategory)
  category?: PestCategory;

  @ApiProperty({ example: ['mango'] })
  @IsArray()
  @IsString({ each: true })
  affectedCrops: string[];

  @ApiProperty({ enum: PestSeverity, example: PestSeverity.critical })
  @IsEnum(PestSeverity)
  severity: PestSeverity;

  @ApiProperty({ example: ['Withering flower clusters', 'Black sooty mold'] })
  @IsArray()
  @IsString({ each: true })
  symptoms: string[];

  @ApiProperty({
    example: 'Nymphs suck cell sap from flowers and young leaves',
  })
  @IsString()
  @IsNotEmpty()
  damageMechanism: string;

  @ApiProperty({ example: 'Up to 60-80% yield loss in severe infestations' })
  @IsString()
  @IsNotEmpty()
  yieldLossPotential: string;

  @ApiPropertyOptional({ example: 'Cold compress and antihistamine if stung' })
  @IsOptional()
  @IsString()
  stingRemedy?: string;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiPropertyOptional({ type: [CreateTreatmentDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTreatmentDto)
  treatments?: CreateTreatmentDto[];
}
