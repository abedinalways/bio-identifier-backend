import { PrismaService } from '../prisma/prisma.service';
import { FilterPestsDto } from './dto/filter-pests.dto';
import { CalculateDosageDto } from './dto/calculate-dosage.dto';
import { PestCategory, Prisma } from '@prisma/client';
export declare class PestsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: FilterPestsDto): Promise<{
        items: ({
            treatments: {
                type: import("@prisma/client").$Enums.TreatmentType;
                title: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                pestId: string;
                activeIngredient: string;
                dosagePerLiter: number;
                dosageUnit: string;
                commercialExamples: string[];
                optimalTiming: string;
                preHarvestIntervalDays: number;
                safetyInstructions: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string;
            scientificName: string;
            commonNames: Prisma.JsonValue;
            category: import("@prisma/client").$Enums.PestCategory;
            affectedCrops: string[];
            severity: import("@prisma/client").$Enums.PestSeverity;
            symptoms: string[];
            damageMechanism: string;
            yieldLossPotential: string;
            stingRemedy: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findByCategory(category: PestCategory): Promise<({
        treatments: {
            type: import("@prisma/client").$Enums.TreatmentType;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            pestId: string;
            activeIngredient: string;
            dosagePerLiter: number;
            dosageUnit: string;
            commercialExamples: string[];
            optimalTiming: string;
            preHarvestIntervalDays: number;
            safetyInstructions: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        scientificName: string;
        commonNames: Prisma.JsonValue;
        category: import("@prisma/client").$Enums.PestCategory;
        affectedCrops: string[];
        severity: import("@prisma/client").$Enums.PestSeverity;
        symptoms: string[];
        damageMechanism: string;
        yieldLossPotential: string;
        stingRemedy: string | null;
    })[]>;
    findByCrop(crop: string): Promise<({
        treatments: {
            type: import("@prisma/client").$Enums.TreatmentType;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            pestId: string;
            activeIngredient: string;
            dosagePerLiter: number;
            dosageUnit: string;
            commercialExamples: string[];
            optimalTiming: string;
            preHarvestIntervalDays: number;
            safetyInstructions: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        scientificName: string;
        commonNames: Prisma.JsonValue;
        category: import("@prisma/client").$Enums.PestCategory;
        affectedCrops: string[];
        severity: import("@prisma/client").$Enums.PestSeverity;
        symptoms: string[];
        damageMechanism: string;
        yieldLossPotential: string;
        stingRemedy: string | null;
    })[]>;
    findOne(id: string): Promise<{
        treatments: {
            type: import("@prisma/client").$Enums.TreatmentType;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            pestId: string;
            activeIngredient: string;
            dosagePerLiter: number;
            dosageUnit: string;
            commercialExamples: string[];
            optimalTiming: string;
            preHarvestIntervalDays: number;
            safetyInstructions: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        scientificName: string;
        commonNames: Prisma.JsonValue;
        category: import("@prisma/client").$Enums.PestCategory;
        affectedCrops: string[];
        severity: import("@prisma/client").$Enums.PestSeverity;
        symptoms: string[];
        damageMechanism: string;
        yieldLossPotential: string;
        stingRemedy: string | null;
    }>;
    calculateDosage(dto: CalculateDosageDto): Promise<{
        pestId: string;
        pestName: string;
        treatment: {
            id: string;
            title: string;
            type: import("@prisma/client").$Enums.TreatmentType;
            activeIngredient: string;
            dosagePerLiter: number;
            dosageUnit: string;
            optimalTiming: string;
            preHarvestIntervalDays: number;
            safetyInstructions: string;
            commercialExamples: string[];
        };
        calculation: {
            waterVolumeLiters: number;
            landAreaAcre: number;
            totalRequiredChemical: number;
            dosageUnit: string;
            standardKnapsackTanks: number;
            dosagePer16LTank: number;
            instructionsSummary: string;
        };
    }>;
}
