import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { IdentifyQueryDto } from './dto/identify.dto';
export declare class IdentificationService {
    private readonly configService;
    private readonly prisma;
    private readonly logger;
    private genAI;
    constructor(configService: ConfigService, prisma: PrismaService);
    identifySpecimen(file: Express.Multer.File, metadata: IdentifyQueryDto, userId?: string): Promise<{
        identificationId: string;
        timestamp: Date;
        type: string;
        confidence: any;
        analysis: any;
        matchedSpecies: any;
        urgency: string;
    }>;
    private callGeminiVision;
    private getFallbackDiagnosis;
    getHistory(userId?: string): Promise<({
        snake: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scientificName: string;
            family: string;
            commonNames: import("@prisma/client/runtime/library").JsonValue;
            isVenomous: boolean;
            dangerLevel: import("@prisma/client").$Enums.DangerLevel;
            venomCategory: import("@prisma/client").$Enums.VenomCategory;
            antivenomRequired: boolean;
            antivenomType: string | null;
            commercialBrands: string[];
            targetToxins: string[];
            lethalityRisk: string;
            habitat: string;
            distribution: string[];
            imageUrl: string;
            firstAidSteps: string[];
            mythsDebunked: string[];
            ecologicalImportance: string;
        };
        pest: {
            treatments: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                pestId: string;
                type: import("@prisma/client").$Enums.TreatmentType;
                title: string;
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
            scientificName: string;
            commonNames: import("@prisma/client/runtime/library").JsonValue;
            imageUrl: string;
            category: import("@prisma/client").$Enums.PestCategory;
            affectedCrops: string[];
            severity: import("@prisma/client").$Enums.PestSeverity;
            symptoms: string[];
            damageMechanism: string;
            yieldLossPotential: string;
            stingRemedy: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        imageUrl: string;
        pestId: string | null;
        type: string;
        userId: string | null;
        userRegion: string | null;
        cropType: string | null;
        confidence: number;
        rawAiOutput: import("@prisma/client/runtime/library").JsonValue;
        snakeId: string | null;
        isCorrect: boolean | null;
    })[]>;
}
