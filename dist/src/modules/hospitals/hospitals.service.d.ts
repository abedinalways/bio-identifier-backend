import { PrismaService } from '../prisma/prisma.service';
import { FilterHospitalsDto, NearestHospitalsDto } from './dto/nearest-hospitals.dto';
export declare class HospitalsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findNearest(query: NearestHospitalsDto): Promise<{
        userCoordinates: {
            lat: number;
            lng: number;
        };
        radiusKm: number;
        count: number;
        nearestHospitals: {
            distanceKm: number;
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            country: string;
            district: string;
            division: string;
            hotline: string;
            hasAntivenomStock: boolean;
            address: string;
            latitude: number;
            longitude: number;
            emergencyUnit: string | null;
            icuAvailable: boolean;
        }[];
    }>;
    findAll(query: FilterHospitalsDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        country: string;
        district: string;
        division: string;
        hotline: string;
        hasAntivenomStock: boolean;
        address: string;
        latitude: number;
        longitude: number;
        emergencyUnit: string | null;
        icuAvailable: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        country: string;
        district: string;
        division: string;
        hotline: string;
        hasAntivenomStock: boolean;
        address: string;
        latitude: number;
        longitude: number;
        emergencyUnit: string | null;
        icuAvailable: boolean;
    }>;
}
