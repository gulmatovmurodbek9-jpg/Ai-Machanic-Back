"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const quote_entity_1 = require("./quote.entity");
const diagnosis_entity_1 = require("../diagnosis/diagnosis.entity");
const quote_service_1 = require("./quote.service");
const quote_controller_1 = require("./quote.controller");
const ai_module_1 = require("../../shared/ai/ai.module");
const auth_module_1 = require("../auth/auth.module");
let QuoteModule = class QuoteModule {
};
exports.QuoteModule = QuoteModule;
exports.QuoteModule = QuoteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([quote_entity_1.Quote, diagnosis_entity_1.Diagnosis]), ai_module_1.AiModule, auth_module_1.AuthModule],
        providers: [quote_service_1.QuoteService],
        controllers: [quote_controller_1.QuoteController],
    })
], QuoteModule);
//# sourceMappingURL=quote.module.js.map