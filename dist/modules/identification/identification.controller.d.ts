import { IdentificationService } from './identification.service';
import { IdentifyQueryDto } from './dto/identify.dto';
export declare class IdentificationController {
    private readonly identificationService;
    constructor(identificationService: IdentificationService);
    identifySpecimen(file: Express.Multer.File, metadata: IdentifyQueryDto): Promise<{
        identificationId: string;
        timestamp: Date;
        type: string;
        confidence: any;
        analysis: any;
        matchedSpecies: any;
        urgency: string;
    }>;
    getHistory(userId: string): Promise<({
        snake: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string;
            isVenomous: boolean;
            dangerLevel: import("@prisma/client").$Enums.DangerLevel;
            scientificName: string;
            family: string;
            commonNames: import("@prisma/client/runtime/library").JsonValue;
            venomCategory: import("@prisma/client").$Enums.VenomCategory;
            antivenomRequired: boolean;
            antivenomType: string | null;
            commercialBrands: string[];
            targetToxins: string[];
            lethalityRisk: string;
            habitat: string;
            distribution: string[];
            firstAidSteps: string[];
            mythsDebunked: string[];
            ecologicalImportance: string;
        };
        pest: {
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
        };
    } & {
        type: string;
        id: string;
        createdAt: Date;
        userId: string | null;
        imageUrl: string;
        userRegion: string | null;
        cropType: string | null;
        confidence: number;
        rawAiOutput: import("@prisma/client/runtime/library").JsonValue;
        snakeId: string | null;
        pestId: string | null;
        isCorrect: boolean | null;
    })[]>;
}
