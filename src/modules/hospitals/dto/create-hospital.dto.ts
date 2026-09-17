import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHospitalDto {
  @ApiPropertyOptional({ example: 'dhaka-dmch' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ example: 'Dhaka Medical College & Hospital (DMCH)' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'BD', default: 'BD' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  @IsNotEmpty()
  division: string;

  @ApiProperty({ example: '+880255165088' })
  @IsString()
  @IsNotEmpty()
  hotline: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  hasAntivenomStock?: boolean;

  @ApiProperty({ example: 'Secretariat Road, Ramna, Dhaka 1000' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 23.7258 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 90.3976 })
  @IsNumber()
  longitude: number;

  @ApiPropertyOptional({ example: 'One-Stop Emergency & Toxicology Ward' })
  @IsOptional()
  @IsString()
  emergencyUnit?: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  icuAvailable?: boolean;
}
