"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakesModule = void 0;
const common_1 = require("@nestjs/common");
const snakes_service_1 = require("./snakes.service");
const snakes_controller_1 = require("./snakes.controller");
const identification_module_1 = require("../identification/identification.module");
let SnakesModule = class SnakesModule {
};
exports.SnakesModule = SnakesModule;
exports.SnakesModule = SnakesModule = __decorate([
    (0, common_1.Module)({
        imports: [identification_module_1.IdentificationModule],
        controllers: [snakes_controller_1.SnakesController],
        providers: [snakes_service_1.SnakesService],
        exports: [snakes_service_1.SnakesService],
    })
], SnakesModule);
//# sourceMappingURL=snakes.module.js.map