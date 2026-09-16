import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSosCallDto {
  @ApiPropertyOptional({
    example: '+8801712345678',
    description: 'Caller contact phone number',
  })
  @IsOptional()
  @IsString()
  callerPhone?: string;

  @ApiPropertyOptional({
    example: 'dhaka-dmch',
    description: 'Target hospital ID',
  })
  @IsOptional()
  @IsString()
  hospitalId?: string;

  @ApiPropertyOptional({ example: 23.7258, description: 'Caller GPS latitude' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({
    example: 90.3976,
    description: 'Caller GPS longitude',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({
    example: 'Victim bitten on right ankle, suspected Russell Viper',
    description: 'Emergency notes',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
