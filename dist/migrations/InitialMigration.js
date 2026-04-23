"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration = void 0;
const typeorm_1 = require("typeorm");
class InitialMigration {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'diagnosis',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'userId',
                    type: 'int',
                },
                {
                    name: 'problemName',
                    type: 'varchar',
                },
                {
                    name: 'severity',
                    type: 'varchar',
                },
                {
                    name: 'minCost',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'maxCost',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'quote',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'diagnosisId',
                    type: 'int',
                },
                {
                    name: 'quoteText',
                    type: 'text',
                },
                {
                    name: 'quotedPrice',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'verdict',
                    type: 'varchar',
                },
                {
                    name: 'reasoning',
                    type: 'text',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'parts_prices',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'partName',
                    type: 'varchar',
                },
                {
                    name: 'carModel',
                    type: 'varchar',
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'sourceUrl',
                    type: 'varchar',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'obd_logs',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'userId',
                    type: 'int',
                },
                {
                    name: 'errorCode',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'severity',
                    type: 'varchar',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('obd_logs');
        await queryRunner.dropTable('parts_prices');
        await queryRunner.dropTable('quote');
        await queryRunner.dropTable('diagnosis');
        await queryRunner.dropTable('user');
    }
}
exports.InitialMigration = InitialMigration;
//# sourceMappingURL=InitialMigration.js.map