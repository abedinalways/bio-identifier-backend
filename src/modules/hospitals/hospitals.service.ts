import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  FilterHospitalsDto,
  NearestHospitalsDto,
} from './dto/nearest-hospitals.dto';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { Prisma } from '@prisma/client';
import { calculateHaversineDistanceKm } from '../../common/utils/haversine';

@Injectable()
export class HospitalsService {
  constructor(private readonly prisma: PrismaService) {}

  async findNearest(query: NearestHospitalsDto) {
    const { lat, lng, radiusKm = 500, limit = 5 } = query;

    const allHospitals = await this.prisma.hospital.findMany({
      where: {
        hasAntivenomStock: true,
      },
    });

    const calculated = allHospitals
      .map(hospital => {
        const distanceKm = calculateHaversineDistanceKm(
          lat,
          lng,
          hospital.latitude,
          hospital.longitude,
        );
        return {
          ...hospital,
          distanceKm,
        };
      })
      .filter(h => h.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, limit);

    return {
      userCoordinates: { lat, lng },
      radiusKm,
      count: calculated.length,
      nearestHospitals: calculated,
    };
  }

  async findAll(query: FilterHospitalsDto) {
    const { country, division, district, search } = query;
    const where: Prisma.HospitalWhereInput = {};

    if (country) {
      where.country = country.toUpperCase();
    }

    if (division) {
      where.division = { contains: division, mode: 'insensitive' };
    }

    if (district) {
      where.district = { contains: district, mode: 'insensitive' };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.hospital.findMany({
      where,
      orderBy: [{ division: 'asc' }, { name: 'asc' }],
    });
  }

  async findOne(id: string) {
    const hospital = await this.prisma.hospital.findUnique({
      where: { id },
    });

    if (!hospital) {
      throw new NotFoundException(`Hospital with ID '${id}' not found`);
    }

    return hospital;
  }

  async create(dto: CreateHospitalDto) {
    const hospitalId =
      dto.id ||
      dto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .slice(0, 30);

    return this.prisma.hospital.create({
      data: {
        ...dto,
        id: hospitalId,
        country: dto.country ? dto.country.toUpperCase() : 'BD',
      },
    });
  }

  async update(id: string, dto: Partial<CreateHospitalDto>) {
    await this.findOne(id);
    return this.prisma.hospital.update({
      where: { id },
      data: {
        ...dto,
        country: dto.country ? dto.country.toUpperCase() : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.hospital.delete({
      where: { id },
    });
  }
}
