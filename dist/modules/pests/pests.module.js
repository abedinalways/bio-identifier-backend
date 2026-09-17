"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PestsModule = void 0;
const common_1 = require("@nestjs/common");
const pests_service_1 = require("./pests.service");
const pests_controller_1 = require("./pests.controller");
const identification_module_1 = require("../identification/identification.module");
let PestsModule = class PestsModule {
};
exports.PestsModule = PestsModule;
exports.PestsModule = PestsModule = __decorate([
    (0, common_1.Module)({
        imports: [identification_module_1.IdentificationModule],
        controllers: [pests_controller_1.PestsController],
        providers: [pests_service_1.PestsService],
        exports: [pests_service_1.PestsService],
    })
], PestsModule);
//# sourceMappingURL=pests.module.js.map