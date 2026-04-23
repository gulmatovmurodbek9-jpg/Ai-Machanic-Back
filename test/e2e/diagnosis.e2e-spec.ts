import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { createE2eApp } from './test-app';

describe('Diagnosis (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    ({ app, dataSource } = await createE2eApp());
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /diagnosis/image returns a created diagnosis payload', async () => {
    const response = await request(app.getHttpServer())
      .post('/diagnosis/image')
      .attach('file', Buffer.from('fake image'), 'test.jpg')
      .field('carMake', 'Toyota')
      .field('carModel', 'Camry')
      .field('carYear', '2020')
      .field('description', 'Grinding noise when braking')
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(
      expect.objectContaining({
        carMake: 'Toyota',
        carModel: 'Camry',
        carYear: 2020,
        fileType: 'image',
        problem: expect.any(String),
        severity: expect.any(String),
      }),
    );
    expect(Number(response.body.data.estimatedCostMin)).toBeGreaterThan(0);

    const diagnoses = await dataSource.getRepository('Diagnosis').find();
    expect(diagnoses).toHaveLength(1);
  });
});
