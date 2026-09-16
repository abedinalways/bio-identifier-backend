import { PestCategory, PestSeverity } from '@prisma/client';
export declare class FilterPestsDto {
    category?: PestCategory;
    crop?: string;
    severity?: PestSeverity;
    search?: string;
    page?: number;
    limit?: number;
}
