import { DangerLevel } from '@prisma/client';
export declare class FilterSnakesDto {
    isVenomous?: boolean;
    dangerLevel?: DangerLevel;
    search?: string;
    page?: number;
    limit?: number;
}
