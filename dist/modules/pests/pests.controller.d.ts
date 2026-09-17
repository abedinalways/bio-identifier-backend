import { PestsService } from './pests.service';
import { FilterPestsDto } from './dto/filter-pests.dto';
import { CalculateDosageDto } from './dto/calculate-dosage.dto';
import { PestCategory } from '@prisma/client';
import { IdentificationService } from '../identification/identification.service';
export declare class PestsController {
    private readonly pestsService;
    private readonly identificationService;
    constructor(pestsService: PestsService, identificationService: IdentificationService);
    identifyPest(file: Express.Multer.File, body: any): Promise<{
        identificationId: string;
        timestamp: Date;
        type: string;
        confidence: any;
        analysis: any;
        matchedSpecies: any;
        urgency: string;
    }>;
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
            commonNames: import("@prisma/client/runtime/library").JsonValue;
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
        commonNames: import("@prisma/client/runtime/library").JsonValue;
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
        commonNames: import("@prisma/client/runtime/library").JsonValue;
        category: import("@prisma/client").$Enums.PestCategory;
        affectedCrops: string[];
        severity: import("@prisma/client").$Enums.PestSeverity;
        symptoms: string[];
        damageMechanism: string;
        yieldLossPotential: string;
        stingRemedy: string | null;
    })[]>;
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
        commonNames: import("@prisma/client/runtime/library").JsonValue;
        category: import("@prisma/client").$Enums.PestCategory;
        affectedCrops: string[];
        severity: import("@prisma/client").$Enums.PestSeverity;
        symptoms: string[];
        damageMechanism: string;
        yieldLossPotential: string;
        stingRemedy: string | null;
    }>;
}
