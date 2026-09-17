import { EmergencyService } from './emergency.service';
import { HospitalsService } from '../hospitals/hospitals.service';
import { FilterHospitalsDto } from '../hospitals/dto/nearest-hospitals.dto';
import { CreateSosCallDto } from './dto/sos-call.dto';
export declare class EmergencyController {
    private readonly emergencyService;
    private readonly hospitalsService;
    constructor(emergencyService: EmergencyService, hospitalsService: HospitalsService);
    getHospitals(query: FilterHospitalsDto): Promise<{
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
            id: string;
            email: string;
            name: string;
            phone: string;
        };
        hospital: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        latitude: number | null;
        longitude: number | null;
        userId: string | null;
        callerPhone: string | null;
        hospitalId: string | null;
        notes: string | null;
    })[]>;
}
