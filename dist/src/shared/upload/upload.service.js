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
var UploadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
let UploadService = UploadService_1 = class UploadService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(UploadService_1.name);
        this.s3Client = null;
        const accessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY');
        const region = this.configService.get('AWS_REGION');
        this.hasAwsConfig = !!(accessKeyId && secretAccessKey && region);
        if (this.hasAwsConfig) {
            this.s3Client = new client_s3_1.S3Client({
                region,
                credentials: { accessKeyId: accessKeyId, secretAccessKey: secretAccessKey },
            });
        }
        else {
            this.logger.warn('AWS credentials not configured — files will not be uploaded to S3');
        }
    }
    async uploadFile(file) {
        if (!this.hasAwsConfig || !this.s3Client) {
            const mockUrl = `local://uploads/${Date.now()}-${file.originalname}`;
            this.logger.warn(`S3 not configured. Mock URL: ${mockUrl}`);
            return mockUrl;
        }
        const bucket = this.configService.get('AWS_S3_BUCKET');
        const key = `${Date.now()}-${file.originalname}`;
        const upload = new lib_storage_1.Upload({
            client: this.s3Client,
            params: {
                Bucket: bucket,
                Key: key,
                Body: file.buffer,
                ACL: 'public-read',
            },
        });
        const result = await upload.done();
        return result.Location;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = UploadService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map