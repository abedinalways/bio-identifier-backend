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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const snakes_service_1 = require("./snakes.service");
const filter_snakes_dto_1 = require("./dto/filter-snakes.dto");
const create_snake_dto_1 = require("./dto/create-snake.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const identification_service_1 = require("../identification/identification.service");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("@nestjs/common");
let SnakesController = class SnakesController {
    constructor(snakesService, identificationService) {
        this.snakesService = snakesService;
        this.identificationService = identificationService;
    }
    async identifySnake(file, body) {
        return this.identificationService.identifySpecimen(file, {
            ...body,
            domain: 'snake',
        });
    }
    async findAll(query) {
        return this.snakesService.findAll(query);
    }
    async findVenomous() {
        return this.snakesService.findVenomous();
    }
    async findHarmless() {
        return this.snakesService.findHarmless();
    }
    async findOne(id) {
        return this.snakesService.findOne(id);
    }
    async create(createSnakeDto) {
        return this.snakesService.create(createSnakeDto);
    }
    async update(id, updateDto) {
        return this.snakesService.update(id, updateDto);
    }
    async remove(id) {
        return this.snakesService.remove(id);
    }
};
exports.SnakesController = SnakesController;
__decorate([
    (0, common_1.Post)('identify'),
    (0, common_2.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiOperation)({ summary: 'Identify snake specimen photo' }),
    __param(0, (0, common_2.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SnakesController.prototype, "identifySnake", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all snakes with pagination, filters, and search',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of snakes with metadata' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_snakes_dto_1.FilterSnakesDto]),
    __metadata("design:returntype", Promise)
], SnakesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('venomous'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all venomous snake species requiring ASV alert',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of venomous snakes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SnakesController.prototype, "findVenomous", null);
__decorate([
    (0, common_1.Get)('harmless'),
    (0, swagger_1.ApiOperation)({ summary: 'Get non-venomous / harmless snake species' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of harmless snakes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SnakesController.prototype, "findHarmless", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get detailed species profile by ID or slug' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detailed snake profile' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Snake not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SnakesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.DOCTOR),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create new snake species entry (Admin/Doctor only)',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Snake created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_snake_dto_1.CreateSnakeDto]),
    __metadata("design:returntype", Promise)
], SnakesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.DOCTOR),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update snake profile (Admin/Doctor only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Snake updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SnakesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete snake entry (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Snake deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SnakesController.prototype, "remove", null);
exports.SnakesController = SnakesController = __decorate([
    (0, swagger_1.ApiTags)('Snakes & Antivenom'),
    (0, common_1.Controller)('snakes'),
    __metadata("design:paramtypes", [snakes_service_1.SnakesService,
        identification_service_1.IdentificationService])
], SnakesController);
//# sourceMappingURL=snakes.controller.js.map