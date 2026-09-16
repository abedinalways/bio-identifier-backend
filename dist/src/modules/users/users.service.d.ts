import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, Prisma } from '@prisma/client';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        phone: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        identifications: ({
            snake: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                scientificName: string;
                family: string;
                commonNames: Prisma.JsonValue;
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
                id: string;
                createdAt: Date;
                updatedAt: Date;
                scientificName: string;
                commonNames: Prisma.JsonValue;
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
            rawAiOutput: Prisma.JsonValue;
            snakeId: string | null;
            isCorrect: boolean | null;
        })[];
    }>;
    updateProfile(userId: string, dto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        phone: string;
        role: import("@prisma/client").$Enums.Role;
        updatedAt: Date;
    }>;
    findAll(query: {
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<{
        items: {
            id: string;
            email: string;
            name: string;
            phone: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    updateRole(userId: string, role: Role): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        updatedAt: Date;
    }>;
}
