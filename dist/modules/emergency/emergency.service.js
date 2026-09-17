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
exports.EmergencyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EmergencyService = class EmergencyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getHotlines() {
        return {
            bangladesh: [
                {
                    name: 'National Emergency Service (Police/Ambulance/Fire)',
                    number: '999',
                    tollFree: true,
                },
                {
                    name: 'DGHS Shastho Batayon (24/7 Medical Hotline)',
                    number: '16263',
                    tollFree: true,
                },
                {
                    name: 'National Poison Information Centre (DMCH)',
                    number: '+880255165088',
                    tollFree: false,
                },
            ],
            india: [
                { name: 'National Emergency Helpline', number: '112', tollFree: true },
                { name: 'Emergency Medical Ambulance', number: '108', tollFree: true },
                {
                    name: 'AIIMS National Poisons Information Centre',
                    number: '+911126593677',
                    tollFree: false,
                },
            ],
            pakistan: [
                {
                    name: 'Punjab Rescue Emergency Service',
                    number: '1122',
                    tollFree: true,
                },
                {
                    name: 'Edhi Emergency Ambulance Service',
                    number: '115',
                    tollFree: true,
                },
            ],
        };
    }
    async logSosCall(dto, userId) {
        if (dto.hospitalId) {
            const hospital = await this.prisma.hospital.findUnique({
                where: { id: dto.hospitalId },
            });
            if (!hospital) {
                throw new common_1.NotFoundException(`Hospital with ID '${dto.hospitalId}' not found`);
            }
        }
        const log = await this.prisma.emergencyLog.create({
            data: {
                userId: userId || null,
                hospitalId: dto.hospitalId || null,
                callerPhone: dto.callerPhone || null,
                latitude: dto.latitude || null,
                longitude: dto.longitude || null,
                notes: dto.notes || 'Direct Emergency SOS Triggered',
            },
            include: {
                hospital: true,
            },
        });
        return {
            message: 'SOS dispatch recorded. Connect immediately with emergency services.',
            logId: log.id,
            timestamp: log.createdAt,
            hospital: log.hospital,
            emergencyHotlines: this.getHotlines(),
        };
    }
    async getSosLogs() {
        return this.prisma.emergencyLog.findMany({
            take: 50,
            orderBy: { createdAt: 'desc' },
            include: {
                hospital: true,
                user: { select: { id: true, name: true, email: true, phone: true } },
            },
        });
    }
};
exports.EmergencyService = EmergencyService;
exports.EmergencyService = EmergencyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmergencyService);
//# sourceMappingURL=emergency.service.js.map