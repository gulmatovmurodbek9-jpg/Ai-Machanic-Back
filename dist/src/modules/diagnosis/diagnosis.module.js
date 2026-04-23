"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosisModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const platform_express_1 = require("@nestjs/platform-express");
const diagnosis_entity_1 = require("./diagnosis.entity");
const diagnosis_service_1 = require("./diagnosis.service");
const diagnosis_controller_1 = require("./diagnosis.controller");
const ai_module_1 = require("../../shared/ai/ai.module");
const upload_module_1 = require("../../shared/upload/upload.module");
const auth_module_1 = require("../auth/auth.module");
let DiagnosisModule = class DiagnosisModule {
};
exports.DiagnosisModule = DiagnosisModule;
exports.DiagnosisModule = DiagnosisModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([diagnosis_entity_1.Diagnosis]),
            platform_express_1.MulterModule.register({ dest: './uploads' }),
            ai_module_1.AiModule,
            upload_module_1.UploadModule,
            auth_module_1.AuthModule,
        ],
        providers: [diagnosis_service_1.DiagnosisService],
        controllers: [diagnosis_controller_1.DiagnosisController],
    })
], DiagnosisModule);
//# sourceMappingURL=diagnosis.module.js.map