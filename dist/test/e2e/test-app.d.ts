import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare function createE2eApp(): Promise<{
    app: INestApplication;
    dataSource: DataSource;
}>;
