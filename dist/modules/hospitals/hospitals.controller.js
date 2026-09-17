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
exports.HospitalsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hospitals_service_1 = require("./hospitals.service");
const nearest_hospitals_dto_1 = require("./dto/nearest-hospitals.dto");
let HospitalsController = class HospitalsController {
    constructor(hospitalsService) {
        this.hospitalsService = hospitalsService;
    }
    async findNearest(query) {
        return this.hospitalsService.findNearest(query);
    }
    async findAll(query) {
        return this.hospitalsService.findAll(query);
    }
    async findOne(id) {
        return this.hospitalsService.findOne(id);
    }
};
exports.HospitalsController = HospitalsController;
__decorate([
    (0, common_1.Get)('nearest'),
    (0, swagger_1.ApiOperation)({
        summary: 'Find nearest antivenom-equipped hospitals using GPS coordinates (Haversine formula)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of nearest hospitals sorted by distance in km',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nearest_hospitals_dto_1.NearestHospitalsDto]),
    __metadata("design:returntype", Promise)
], HospitalsController.prototype, "findNearest", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all hospitals with optional country, division, and district filters',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of emergency hospitals' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nearest_hospitals_dto_1.FilterHospitalsDto]),
    __metadata("design:returntype", Promise)
], HospitalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single hospital details by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hospital details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hospital not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HospitalsController.prototype, "findOne", null);
exports.HospitalsController = HospitalsController = __decorate([
    (0, swagger_1.ApiTags)('Emergency Antivenom Hospitals'),
    (0, common_1.Controller)('hospitals'),
    __metadata("design:paramtypes", [hospitals_service_1.HospitalsService])
], HospitalsController);
//# sourceMappingURL=hospitals.controller.js.map