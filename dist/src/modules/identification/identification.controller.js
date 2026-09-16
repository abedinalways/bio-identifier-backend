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
exports.IdentificationController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const identification_service_1 = require("./identification.service");
const identify_dto_1 = require("./dto/identify.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
let IdentificationController = class IdentificationController {
    constructor(identificationService) {
        this.identificationService = identificationService;
    }
    async identifySpecimen(file, metadata) {
        return this.identificationService.identifySpecimen(file, metadata);
    }
    async getHistory(userId) {
        return this.identificationService.getHistory(userId);
    }
};
exports.IdentificationController = IdentificationController;
__decorate([
    (0, common_1.Post)('analyze'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({
        summary: 'Upload specimen photo for Gemini Vision AI species identification and clinical analysis',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Species diagnosis, danger categorization, and clinical guidance',
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, identify_dto_1.IdentifyQueryDto]),
    __metadata("design:returntype", Promise)
], IdentificationController.prototype, "identifySpecimen", null);
__decorate([
    (0, common_1.Get)('history'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get diagnostic history for authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Identification history log' }),
    __param(0, (0, get_user_decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IdentificationController.prototype, "getHistory", null);
exports.IdentificationController = IdentificationController = __decorate([
    (0, swagger_1.ApiTags)('AI Specimen Identification'),
    (0, common_1.Controller)('identify'),
    __metadata("design:paramtypes", [identification_service_1.IdentificationService])
], IdentificationController);
//# sourceMappingURL=identification.controller.js.map