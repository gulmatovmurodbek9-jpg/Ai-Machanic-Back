"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createE2eApp = createE2eApp;
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("typeorm");
const app_module_1 = require("../../src/app.module");
const http_exception_filter_1 = require("../../src/common/filters/http-exception.filter");
const transform_interceptor_1 = require("../../src/common/interceptors/transform.interceptor");
async function createE2eApp() {
    const moduleFixture = await testing_1.Test.createTestingModule({
        imports: [app_module_1.AppModule],
    }).compile();
    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    await app.init();
    const dataSource = app.get(typeorm_1.DataSource);
    await dataSource.dropDatabase();
    await dataSource.synchronize();
    return { app, dataSource };
}
//# sourceMappingURL=test-app.js.map