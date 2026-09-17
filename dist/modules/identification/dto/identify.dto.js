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
exports.IdentifyQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class IdentifyQueryDto {
}
exports.IdentifyQueryDto = IdentifyQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'snake',
        description: 'Domain hint: snake, pest, or auto',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentifyQueryDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Rajshahi, Bangladesh',
        description: 'Geographic location / habitat where specimen was sighted',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentifyQueryDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'mango',
        description: 'Crop type if pest inspection',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentifyQueryDto.prototype, "cropType", void 0);
//# sourceMappingURL=identify.dto.js.map