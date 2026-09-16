import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterPestsDto } from './dto/filter-pests.dto';
import { CalculateDosageDto } from './dto/calculate-dosage.dto';
import { PestCategory, Prisma } from '@prisma/client';

@Injectable()
export class PestsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: FilterPestsDto) {
    const { category, crop, severity, search, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.PestWhereInput = {};

    if (category) {
      where.category = category;
    }

    if (crop) {
      where.affectedCrops = { has: crop.toLowerCase() };
    }

    if (severity) {
      where.severity = severity;
    }

    if (search) {
      where.OR = [
        { scientificName: { contains: search, mode: 'insensitive' } },
        { id: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.pest.count({ where }),
      this.prisma.pest.findMany({
        where,
        skip,
        take: limit,
        include: { treatments: true },
        orderBy: [{ severity: 'asc' }, { scientificName: 'asc' }],
      }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByCategory(category: PestCategory) {
    return this.prisma.pest.findMany({
      where: { category },
      include: { treatments: true },
      orderBy: { scientificName: 'asc' },
    });
  }

  async findByCrop(crop: string) {
    return this.prisma.pest.findMany({
      where: {
        affectedCrops: { has: crop.toLowerCase() },
      },
      include: { treatments: true },
      orderBy: { severity: 'asc' },
    });
  }

  async findOne(id: string) {
    const pest = await this.prisma.pest.findUnique({
      where: { id },
      include: { treatments: true },
    });

    if (!pest) {
      throw new NotFoundException(`Pest with ID '${id}' not found`);
    }

    return pest;
  }

  async calculateDosage(dto: CalculateDosageDto) {
    const treatment = await this.prisma.treatment.findUnique({
      where: { id: dto.treatmentId },
      include: { pest: true },
    });

    if (!treatment) {
      throw new NotFoundException(
        `Treatment with ID '${dto.treatmentId}' not found`,
      );
    }

    if (treatment.pestId !== dto.pestId) {
      throw new BadRequestException(
        `Treatment does not belong to specified pest '${dto.pestId}'`,
      );
    }

    let waterLiters = dto.waterLiters;
    if (!waterLiters && dto.landAreaAcre) {
      // Standard South Asian agricultural field calibration: ~200 Liters spray volume per acre
      waterLiters = dto.landAreaAcre * 200;
    }

    if (!waterLiters || waterLiters <= 0) {
      throw new BadRequestException(
        'Either waterLiters or landAreaAcre must be provided and greater than 0',
      );
    }

    const totalRequiredChemical = Number(
      (waterLiters * treatment.dosagePerLiter).toFixed(2),
    );
    const knapsackTankCapacityLiters = 16;
    const tanksRequired = Math.ceil(waterLiters / knapsackTankCapacityLiters);
    const dosagePer16LTank = Number((16 * treatment.dosagePerLiter).toFixed(2));

    return {
      pestId: treatment.pest.id,
      pestName: treatment.pest.scientificName,
      treatment: {
        id: treatment.id,
        title: treatment.title,
        type: treatment.type,
        activeIngredient: treatment.activeIngredient,
        dosagePerLiter: treatment.dosagePerLiter,
        dosageUnit: treatment.dosageUnit,
        optimalTiming: treatment.optimalTiming,
        preHarvestIntervalDays: treatment.preHarvestIntervalDays,
        safetyInstructions: treatment.safetyInstructions,
        commercialExamples: treatment.commercialExamples,
      },
      calculation: {
        waterVolumeLiters: waterLiters,
        landAreaAcre: dto.landAreaAcre ?? null,
        totalRequiredChemical,
        dosageUnit: treatment.dosageUnit,
        standardKnapsackTanks: tanksRequired,
        dosagePer16LTank,
        instructionsSummary: `Mix ${dosagePer16LTank} ${treatment.dosageUnit} per 16-liter knapsack tank. You will need approximately ${tanksRequired} tank(s) for ${waterLiters}L total spray solution.`,
      },
    };
  }
}
