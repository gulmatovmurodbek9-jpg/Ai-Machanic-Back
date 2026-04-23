"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const part_price_entity_1 = require("../../src/modules/pricing/part-price.entity");
const test_app_1 = require("./test-app");
describe('Pricing (e2e)', () => {
    let app;
    let dataSource;
    beforeAll(async () => {
        ({ app, dataSource } = await (0, test_app_1.createE2eApp)());
        const repository = dataSource.getRepository(part_price_entity_1.PartPrice);
        await repository.save(repository.create([
            {
                partName: 'Brake Pads',
                carMake: 'Toyota',
                carModel: 'Camry',
                price: 45.99,
                source: 'AutoZone',
                sourceUrl: 'https://autozone.com/brake-pads',
                partNumber: 'AZ-BP-001',
            },
            {
                partName: 'Brake Pads',
                carMake: 'Toyota',
                carModel: 'Camry',
                price: 38.99,
                source: 'RockAuto',
                sourceUrl: 'https://rockauto.com/brake-pads',
                partNumber: 'RA-BP-TC01',
            },
            {
                partName: 'Brake Pads',
                carMake: 'Toyota',
                carModel: 'Camry',
                price: 49.99,
                source: 'OReilly',
                sourceUrl: 'https://oreillyauto.com/brake-pads',
                partNumber: 'OR-BP-TC01',
            },
        ]));
    });
    afterAll(async () => {
        await app.close();
    });
    it('GET /pricing/search returns 2 or more matching part prices', async () => {
        const response = await request(app.getHttpServer())
            .get('/pricing/search')
            .query({
            part: 'Brake Pads',
            carMake: 'Toyota',
            carModel: 'Camry',
        })
            .expect(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.results.length).toBeGreaterThanOrEqual(2);
        expect(response.body.data.results[0]).toHaveProperty('source');
        expect(response.body.data.cheapest.source).toBe('RockAuto');
        expect(response.body.data.priceRange).toEqual({ min: 38.99, max: 49.99 });
    });
});
//# sourceMappingURL=pricing.e2e-spec.js.map