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
exports.SnakesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SnakesService = class SnakesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { isVenomous, dangerLevel, search, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (isVenomous !== undefined) {
            where.isVenomous = isVenomous;
        }
        if (dangerLevel) {
            where.dangerLevel = dangerLevel;
        }
        if (search) {
            where.OR = [
                { scientificName: { contains: search, mode: 'insensitive' } },
                { family: { contains: search, mode: 'insensitive' } },
                { id: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [total, items] = await Promise.all([
            this.prisma.snake.count({ where }),
            this.prisma.snake.findMany({
                where,
                skip,
                take: limit,
                orderBy: [{ dangerLevel: 'asc' }, { scientificName: 'asc' }],
            }),
        ]);
        return {
            items,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findVenomous() {
        return this.prisma.snake.findMany({
            where: { isVenomous: true },
            orderBy: { dangerLevel: 'asc' },
        });
    }
    async findHarmless() {
        return this.prisma.snake.findMany({
            where: { isVenomous: false },
            orderBy: { scientificName: 'asc' },
        });
    }
    async findOne(id) {
        const snake = await this.prisma.snake.findUnique({
            where: { id },
        });
        if (!snake) {
            throw new common_1.NotFoundException(`Snake with ID '${id}' not found`);
        }
        return snake;
    }
    async create(dto) {
        return this.prisma.snake.create({
            data: dto,
        });
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.snake.update({
            where: { id },
            data: data,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.snake.delete({
            where: { id },
        });
    }
};
exports.SnakesService = SnakesService;
exports.SnakesService = SnakesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SnakesService);
//# sourceMappingURL=snakes.service.js.map