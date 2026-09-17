"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const haversine_1 = require("../../common/utils/haversine");
let HospitalsService = class HospitalsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findNearest(query) {
        const { lat, lng, radiusKm = 500, limit = 5 } = query;
        const allHospitals = await this.prisma.hospital.findMany({
            where: {
                hasAntivenomStock: true,
            },
        });
        const calculated = allHospitals
            .map(hospital => {
            const distanceKm = (0, haversine_1.calculateHaversineDistanceKm)(lat, lng, hospital.latitude, hospital.longitude);
            return {
                ...hospital,
                distanceKm,
            };
        })
            .filter(h => h.distanceKm <= radiusKm)
            .sort((a, b) => a.distanceKm - b.distanceKm)
            .slice(0, limit);
        return {
            userCoordinates: { lat, lng },
            radiusKm,
            count: calculated.length,
            nearestHospitals: calculated,
        };
    }
    async findAll(query) {
        const { country, division, district, search } = query;
        const where = {};
        if (country) {
            where.country = country.toUpperCase();
        }
        if (division) {
            where.division = { contains: division, mode: 'insensitive' };
        }
        if (district) {
            where.district = { contains: district, mode: 'insensitive' };
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { address: { contains: search, mode: 'insensitive' } },
            ];
        }
        return this.prisma.hospital.findMany({
            where,
            orderBy: [{ division: 'asc' }, { name: 'asc' }],
        });
    }
    async findOne(id) {
        const hospital = await this.prisma.hospital.findUnique({
            where: { id },
        });
        if (!hospital) {
            throw new common_1.NotFoundException(`Hospital with ID '${id}' not found`);
        }
        return hospital;
    }
};
exports.HospitalsService = HospitalsService;
exports.HospitalsService = HospitalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HospitalsService);
//# sourceMappingURL=hospitals.service.js.map