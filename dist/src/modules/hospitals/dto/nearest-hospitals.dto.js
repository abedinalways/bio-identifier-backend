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
exports.FilterHospitalsDto = exports.NearestHospitalsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class NearestHospitalsDto {
    constructor() {
        this.radiusKm = 500;
        this.limit = 5;
    }
}
exports.NearestHospitalsDto = NearestHospitalsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 23.8103,
        description: 'User latitude (e.g. Dhaka is 23.8103)',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], NearestHospitalsDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 90.4125,
        description: 'User longitude (e.g. Dhaka is 90.4125)',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], NearestHospitalsDto.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 500,
        description: 'Maximum search radius in kilometers',
        default: 500,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], NearestHospitalsDto.prototype, "radiusKm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 5,
        description: 'Maximum number of nearest hospitals to return',
        default: 5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], NearestHospitalsDto.prototype, "limit", void 0);
class FilterHospitalsDto {
}
exports.FilterHospitalsDto = FilterHospitalsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'BD',
        description: 'Country code (BD, IN, PK)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterHospitalsDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Dhaka',
        description: 'Division or Province',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterHospitalsDto.prototype, "division", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'District search term' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterHospitalsDto.prototype, "district", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search term for hospital name or address',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterHospitalsDto.prototype, "search", void 0);
//# sourceMappingURL=nearest-hospitals.dto.js.map