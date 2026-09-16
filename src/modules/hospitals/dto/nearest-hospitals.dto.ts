import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class NearestHospitalsDto {
  @ApiProperty({
    example: 23.8103,
    description: 'User latitude (e.g. Dhaka is 23.8103)',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @ApiProperty({
    example: 90.4125,
    description: 'User longitude (e.g. Dhaka is 90.4125)',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;

  @ApiPropertyOptional({
    example: 500,
    description: 'Maximum search radius in kilometers',
    default: 500,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  radiusKm?: number = 500;

  @ApiPropertyOptional({
    example: 5,
    description: 'Maximum number of nearest hospitals to return',
    default: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number = 5;
}

export class FilterHospitalsDto {
  @ApiPropertyOptional({
    example: 'BD',
    description: 'Country code (BD, IN, PK)',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    example: 'Dhaka',
    description: 'Division or Province',
  })
  @IsOptional()
  @IsString()
  division?: string;

  @ApiPropertyOptional({ description: 'District search term' })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({
    description: 'Search term for hospital name or address',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
