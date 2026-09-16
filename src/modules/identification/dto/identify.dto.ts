import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class IdentifyQueryDto {
  @ApiPropertyOptional({
    example: 'snake',
    description: 'Domain hint: snake, pest, or auto',
  })
  @IsOptional()
  @IsString()
  domain?: 'snake' | 'pest' | 'auto';

  @ApiPropertyOptional({
    example: 'Rajshahi, Bangladesh',
    description: 'Geographic location / habitat where specimen was sighted',
  })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({
    example: 'mango',
    description: 'Crop type if pest inspection',
  })
  @IsOptional()
  @IsString()
  cropType?: string;
}
