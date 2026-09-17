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
exports.CalculateDosageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CalculateDosageDto {
}
exports.CalculateDosageDto = CalculateDosageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'mango-hopper', description: 'ID of target pest' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CalculateDosageDto.prototype, "pestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'mh-chem', description: 'ID of treatment protocol' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CalculateDosageDto.prototype, "treatmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 100,
        description: 'Direct spray water volume in liters',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CalculateDosageDto.prototype, "waterLiters", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1.5,
        description: 'Land area in acres (if water volume not directly provided)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], CalculateDosageDto.prototype, "landAreaAcre", void 0);
//# sourceMappingURL=calculate-dosage.dto.js.map