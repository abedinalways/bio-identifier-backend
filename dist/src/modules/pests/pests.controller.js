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
exports.PestsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pests_service_1 = require("./pests.service");
const filter_pests_dto_1 = require("./dto/filter-pests.dto");
const calculate_dosage_dto_1 = require("./dto/calculate-dosage.dto");
const client_1 = require("@prisma/client");
let PestsController = class PestsController {
    constructor(pestsService) {
        this.pestsService = pestsService;
    }
    async findAll(query) {
        return this.pestsService.findAll(query);
    }
    async findByCategory(category) {
        return this.pestsService.findByCategory(category);
    }
    async findByCrop(crop) {
        return this.pestsService.findByCrop(crop);
    }
    async calculateDosage(dto) {
        return this.pestsService.calculateDosage(dto);
    }
    async findOne(id) {
        return this.pestsService.findOne(id);
    }
};
exports.PestsController = PestsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all pests with filters (category, crop, severity, search)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated list of pests' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_pests_dto_1.FilterPestsDto]),
    __metadata("design:returntype", Promise)
], PestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('category/:category'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get pests by category (crop_pest or stinging_insect)',
    }),
    (0, swagger_1.ApiParam)({ name: 'category', enum: client_1.PestCategory }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of pests in given category' }),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PestsController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)('crop/:crop'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all pests affecting a specific crop (e.g. mango, rice, litchi)',
    }),
    (0, swagger_1.ApiParam)({ name: 'crop', example: 'mango' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of pests targeting the crop' }),
    __param(0, (0, common_1.Param)('crop')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PestsController.prototype, "findByCrop", null);
__decorate([
    (0, common_1.Post)('calculate-dosage'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Calculate calibrated pesticide dosage based on water volume or land acreage',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Precise dosage calculation and safety instructions',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calculate_dosage_dto_1.CalculateDosageDto]),
    __metadata("design:returntype", Promise)
], PestsController.prototype, "calculateDosage", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get detailed pest profile with organic and chemical treatment protocols',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Detailed pest and treatment profile',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pest not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PestsController.prototype, "findOne", null);
exports.PestsController = PestsController = __decorate([
    (0, swagger_1.ApiTags)('Pests & Crop Remedies'),
    (0, common_1.Controller)('pests'),
    __metadata("design:paramtypes", [pests_service_1.PestsService])
], PestsController);
//# sourceMappingURL=pests.controller.js.map