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
exports.CreateSnakeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateSnakeDto {
}
exports.CreateSnakeDto = CreateSnakeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'russells-viper' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSnakeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Daboia russelii' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSnakeDto.prototype, "scientificName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Viperidae' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSnakeDto.prototype, "family", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { en: "Russell's Viper", bn: 'চন্দ্রবোড়া' } }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSnakeDto.prototype, "commonNames", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSnakeDto.prototype, "isVenomous", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.DangerLevel, example: client_1.DangerLevel.deadly }),
    (0, class_validator_1.IsEnum)(client_1.DangerLevel),
    __metadata("design:type", String)
], CreateSnakeDto.prototype, "dangerLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.VenomCategory, example: client_1.VenomCategory.hemotoxic }),
    (0, class_validator_1.IsEnum)(client_1.VenomCategory),
    __metadata("design:type", String)
], CreateSnakeDto.prototype, "venomCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSnakeDto.prototype, "antivenomRequired", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Polyvalent Anti-Snake Venom (ASV) Serum' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSnakeDto.prototype, "antivenomType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Incepta Antivenom', 'Bharat Serums ASV'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateSnakeDto.prototype, "commercialBrands", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Phospholipase A2', 'Procoagulants'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateSnakeDto.prototype, "targetToxins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Extremely Critical - Leading cause of snakebite fatalities',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSnakeDto.prototype, "lethalityRisk", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Agricultural open fields, paddy fields' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSnakeDto.prototype, "habitat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Bangladesh', 'India', 'Pakistan'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateSnakeDto.prototype, "distribution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://images.unsplash.com/...' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSnakeDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Immobilize limb', 'Rush to hospital'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateSnakeDto.prototype, "firstAidSteps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Myth: Russell Viper chases humans'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateSnakeDto.prototype, "mythsDebunked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Controls agricultural rodent populations' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSnakeDto.prototype, "ecologicalImportance", void 0);
//# sourceMappingURL=create-snake.dto.js.map