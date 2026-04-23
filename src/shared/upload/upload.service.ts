import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private s3Client: S3Client | null = null;
  private hasAwsConfig: boolean;

  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
    const region = this.configService.get<string>('AWS_REGION');

    this.hasAwsConfig = !!(accessKeyId && secretAccessKey && region);

    if (this.hasAwsConfig) {
      this.s3Client = new S3Client({
        region,
        credentials: { accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey! },
      });
    } else {
      this.logger.warn('AWS credentials not configured — files will not be uploaded to S3');
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!this.hasAwsConfig || !this.s3Client) {
      // Return a local placeholder URL when AWS is not configured
      const mockUrl = `local://uploads/${Date.now()}-${file.originalname}`;
      this.logger.warn(`S3 not configured. Mock URL: ${mockUrl}`);
      return mockUrl;
    }

    const bucket = this.configService.get<string>('AWS_S3_BUCKET');
    const key = `${Date.now()}-${file.originalname}`;

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
      },
    });

    const result = await upload.done();
    return (result as any).Location;
  }
}
