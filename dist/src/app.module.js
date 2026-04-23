"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./modules/auth/auth.module");
const diagnosis_module_1 = require("./modules/diagnosis/diagnosis.module");
const quote_module_1 = require("./modules/quote/quote.module");
const pricing_module_1 = require("./modules/pricing/pricing.module");
const obd_module_1 = require("./modules/obd/obd.module");
const ai_module_1 = require("./shared/ai/ai.module");
const upload_module_1 = require("./shared/upload/upload.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'sqlite',
                    database: 'database.sqlite',
                    entities: [__dirname + '/**/*.entity{.ts,.js}', __dirname + '/config/*.entity{.ts,.js}'],
                    synchronize: true,
                }),
            }),
            auth_module_1.AuthModule,
            diagnosis_module_1.DiagnosisModule,
            quote_module_1.QuoteModule,
            pricing_module_1.PricingModule,
            obd_module_1.ObdModule,
            ai_module_1.AiModule,
            upload_module_1.UploadModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map