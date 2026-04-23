"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObdModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const obd_log_entity_1 = require("./obd-log.entity");
const obd_service_1 = require("./obd.service");
const obd_controller_1 = require("./obd.controller");
const ai_module_1 = require("../../shared/ai/ai.module");
const auth_module_1 = require("../auth/auth.module");
let ObdModule = class ObdModule {
};
exports.ObdModule = ObdModule;
exports.ObdModule = ObdModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([obd_log_entity_1.ObdLog]), ai_module_1.AiModule, auth_module_1.AuthModule],
        providers: [obd_service_1.ObdService],
        controllers: [obd_controller_1.ObdController],
    })
], ObdModule);
//# sourceMappingURL=obd.module.js.map