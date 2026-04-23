"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const test_app_1 = require("./test-app");
describe('Diagnosis (e2e)', () => {
    let app;
    let dataSource;
    beforeAll(async () => {
        ({ app, dataSource } = await (0, test_app_1.createE2eApp)());
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
        expect(response.body.data).toEqual(expect.objectContaining({
            carMake: 'Toyota',
            carModel: 'Camry',
            carYear: 2020,
            fileType: 'image',
            problem: expect.any(String),
            severity: expect.any(String),
        }));
        expect(Number(response.body.data.estimatedCostMin)).toBeGreaterThan(0);
        const diagnoses = await dataSource.getRepository('Diagnosis').find();
        expect(diagnoses).toHaveLength(1);
    });
});
//# sourceMappingURL=diagnosis.e2e-spec.js.map