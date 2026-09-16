import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { DangerLevel, VenomCategory } from '@prisma/client';

export class CreateSnakeDto {
  @ApiProperty({ example: 'russells-viper' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Daboia russelii' })
  @IsString()
  @IsNotEmpty()
  scientificName: string;

  @ApiProperty({ example: 'Viperidae' })
  @IsString()
  @IsNotEmpty()
  family: string;

  @ApiProperty({ example: { en: "Russell's Viper", bn: 'চন্দ্রবোড়া' } })
  @IsObject()
  commonNames: Record<string, string>;

  @ApiProperty({ example: true })
  @IsBoolean()
  isVenomous: boolean;

  @ApiProperty({ enum: DangerLevel, example: DangerLevel.deadly })
  @IsEnum(DangerLevel)
  dangerLevel: DangerLevel;

  @ApiProperty({ enum: VenomCategory, example: VenomCategory.hemotoxic })
  @IsEnum(VenomCategory)
  venomCategory: VenomCategory;

  @ApiProperty({ example: true })
  @IsBoolean()
  antivenomRequired: boolean;

  @ApiPropertyOptional({ example: 'Polyvalent Anti-Snake Venom (ASV) Serum' })
  @IsOptional()
  @IsString()
  antivenomType?: string;

  @ApiProperty({ example: ['Incepta Antivenom', 'Bharat Serums ASV'] })
  @IsArray()
  @IsString({ each: true })
  commercialBrands: string[];

  @ApiProperty({ example: ['Phospholipase A2', 'Procoagulants'] })
  @IsArray()
  @IsString({ each: true })
  targetToxins: string[];

  @ApiProperty({
    example: 'Extremely Critical - Leading cause of snakebite fatalities',
  })
  @IsString()
  @IsNotEmpty()
  lethalityRisk: string;

  @ApiProperty({ example: 'Agricultural open fields, paddy fields' })
  @IsString()
  @IsNotEmpty()
  habitat: string;

  @ApiProperty({ example: ['Bangladesh', 'India', 'Pakistan'] })
  @IsArray()
  @IsString({ each: true })
  distribution: string[];

  @ApiProperty({ example: 'https://images.unsplash.com/...' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ example: ['Immobilize limb', 'Rush to hospital'] })
  @IsArray()
  @IsString({ each: true })
  firstAidSteps: string[];

  @ApiProperty({ example: ['Myth: Russell Viper chases humans'] })
  @IsArray()
  @IsString({ each: true })
  mythsDebunked: string[];

  @ApiProperty({ example: 'Controls agricultural rodent populations' })
  @IsString()
  @IsNotEmpty()
  ecologicalImportance: string;
}
