"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentificationModule = void 0;
const common_1 = require("@nestjs/common");
const identification_service_1 = require("./identification.service");
const identification_controller_1 = require("./identification.controller");
let IdentificationModule = class IdentificationModule {
};
exports.IdentificationModule = IdentificationModule;
exports.IdentificationModule = IdentificationModule = __decorate([
    (0, common_1.Module)({
        controllers: [identification_controller_1.IdentificationController],
        providers: [identification_service_1.IdentificationService],
        exports: [identification_service_1.IdentificationService],
    })
], IdentificationModule);
//# sourceMappingURL=identification.module.js.map