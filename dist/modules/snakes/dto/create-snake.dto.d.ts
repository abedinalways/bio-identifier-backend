import { DangerLevel, VenomCategory } from '@prisma/client';
export declare class CreateSnakeDto {
    id: string;
    scientificName: string;
    family: string;
    commonNames: Record<string, string>;
    isVenomous: boolean;
    dangerLevel: DangerLevel;
    venomCategory: VenomCategory;
    antivenomRequired: boolean;
    antivenomType?: string;
    commercialBrands: string[];
    targetToxins: string[];
    lethalityRisk: string;
    habitat: string;
    distribution: string[];
    imageUrl: string;
    firstAidSteps: string[];
    mythsDebunked: string[];
    ecologicalImportance: string;
}
