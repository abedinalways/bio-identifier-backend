"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PestsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PestsService = class PestsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { category, crop, severity, search, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const where = {};
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
    async findByCategory(category) {
        return this.prisma.pest.findMany({
            where: { category },
            include: { treatments: true },
            orderBy: { scientificName: 'asc' },
        });
    }
    async findByCrop(crop) {
        return this.prisma.pest.findMany({
            where: {
                affectedCrops: { has: crop.toLowerCase() },
            },
            include: { treatments: true },
            orderBy: { severity: 'asc' },
        });
    }
    async findOne(id) {
        const pest = await this.prisma.pest.findUnique({
            where: { id },
            include: { treatments: true },
        });
        if (!pest) {
            throw new common_1.NotFoundException(`Pest with ID '${id}' not found`);
        }
        return pest;
    }
    async calculateDosage(dto) {
        const treatment = await this.prisma.treatment.findUnique({
            where: { id: dto.treatmentId },
            include: { pest: true },
        });
        if (!treatment) {
            throw new common_1.NotFoundException(`Treatment with ID '${dto.treatmentId}' not found`);
        }
        if (treatment.pestId !== dto.pestId) {
            throw new common_1.BadRequestException(`Treatment does not belong to specified pest '${dto.pestId}'`);
        }
        let waterLiters = dto.waterLiters;
        if (!waterLiters && dto.landAreaAcre) {
            waterLiters = dto.landAreaAcre * 200;
        }
        if (!waterLiters || waterLiters <= 0) {
            throw new common_1.BadRequestException('Either waterLiters or landAreaAcre must be provided and greater than 0');
        }
        const totalRequiredChemical = Number((waterLiters * treatment.dosagePerLiter).toFixed(2));
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
};
exports.PestsService = PestsService;
exports.PestsService = PestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PestsService);
//# sourceMappingURL=pests.service.js.map