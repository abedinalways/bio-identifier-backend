import { PrismaService } from '../prisma/prisma.service';
import { CreateSosCallDto } from './dto/sos-call.dto';
export declare class EmergencyService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHotlines(): {
        bangladesh: {
            name: string;
            number: string;
            tollFree: boolean;
        }[];
        india: {
            name: string;
            number: string;
            tollFree: boolean;
        }[];
        pakistan: {
            name: string;
            number: string;
            tollFree: boolean;
        }[];
    };
    logSosCall(dto: CreateSosCallDto, userId?: string): Promise<{
        message: string;
        logId: string;
        timestamp: Date;
        hospital: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            country: string;
            division: string;
            district: string;
            hotline: string;
            hasAntivenomStock: boolean;
            address: string;
            latitude: number;
            longitude: number;
            emergencyUnit: string | null;
            icuAvailable: boolean;
        };
        emergencyHotlines: {
            bangladesh: {
                name: string;
                number: string;
                tollFree: boolean;
            }[];
            india: {
                name: string;
                number: string;
                tollFree: boolean;
            }[];
            pakistan: {
                name: string;
                number: string;
                tollFree: boolean;
            }[];
        };
    }>;
    getSosLogs(): Promise<({
        user: {
            email: string;
            name: string;
            phone: string;
            id: string;
        };
        hospital: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            country: string;
            division: string;
            district: string;
            hotline: string;
            hasAntivenomStock: boolean;
            address: string;
            latitude: number;
            longitude: number;
            emergencyUnit: string | null;
            icuAvailable: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string | null;
        latitude: number | null;
        longitude: number | null;
        callerPhone: string | null;
        hospitalId: string | null;
        notes: string | null;
    })[]>;
}
