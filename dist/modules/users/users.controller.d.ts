import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(userId: string): Promise<{
        email: string;
        name: string;
        phone: string;
        id: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        identifications: ({
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
        })[];
    }>;
    updateProfile(userId: string, dto: UpdateUserDto): Promise<{
        email: string;
        name: string;
        phone: string;
        id: string;
        role: import("@prisma/client").$Enums.Role;
        updatedAt: Date;
    }>;
    findAll(page?: number, limit?: number, search?: string): Promise<{
        items: {
            email: string;
            name: string;
            phone: string;
            id: string;
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
    updateRole(id: string, dto: UpdateRoleDto): Promise<{
        email: string;
        name: string;
        id: string;
        role: import("@prisma/client").$Enums.Role;
        updatedAt: Date;
    }>;
}
