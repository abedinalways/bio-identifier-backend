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
exports.EmergencyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const emergency_service_1 = require("./emergency.service");
const sos_call_dto_1 = require("./dto/sos-call.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
const client_1 = require("@prisma/client");
let EmergencyController = class EmergencyController {
    constructor(emergencyService) {
        this.emergencyService = emergencyService;
    }
    getHotlines() {
        return this.emergencyService.getHotlines();
    }
    async logSosCall(dto, userId) {
        return this.emergencyService.logSosCall(dto, userId);
    }
    async getSosLogs() {
        return this.emergencyService.getSosLogs();
    }
};
exports.EmergencyController = EmergencyController;
__decorate([
    (0, common_1.Get)('hotlines'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get verified emergency and poison control hotlines for South Asia (BD, IN, PK)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Regional emergency and poison control hotlines directory',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmergencyController.prototype, "getHotlines", null);
__decorate([
    (0, common_1.Post)('sos'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Trigger and record emergency SOS dispatch with GPS coordinates and victim notes',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Emergency SOS dispatch recorded successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sos_call_dto_1.CreateSosCallDto, String]),
    __metadata("design:returntype", Promise)
], EmergencyController.prototype, "logSosCall", null);
__decorate([
    (0, common_1.Get)('logs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.DOCTOR),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve recent emergency SOS dispatch logs (Admin and Doctor only)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of emergency dispatch records with hospital information',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmergencyController.prototype, "getSosLogs", null);
exports.EmergencyController = EmergencyController = __decorate([
    (0, swagger_1.ApiTags)('Emergency Hotline & SOS Dispatch'),
    (0, common_1.Controller)('emergency'),
    __metadata("design:paramtypes", [emergency_service_1.EmergencyService])
], EmergencyController);
//# sourceMappingURL=emergency.controller.js.map