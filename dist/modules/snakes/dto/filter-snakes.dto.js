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
exports.FilterSnakesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class FilterSnakesDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.FilterSnakesDto = FilterSnakesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by venomous status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true' || value === true)
            return true;
        if (value === 'false' || value === false)
            return false;
        return undefined;
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FilterSnakesDto.prototype, "isVenomous", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.DangerLevel,
        description: 'Filter by danger level',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.DangerLevel),
    __metadata("design:type", String)
], FilterSnakesDto.prototype, "dangerLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search query across scientific name and common names',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterSnakesDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Page number (1-based)', default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FilterSnakesDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Number of items per page', default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FilterSnakesDto.prototype, "limit", void 0);
//# sourceMappingURL=filter-snakes.dto.js.map