"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const typeorm_1 = require("@nestjs/typeorm");
const part_price_entity_1 = require("../modules/pricing/part-price.entity");
async function seed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const dataSource = app.get((0, typeorm_1.getDataSourceToken)());
    const partPriceRepository = dataSource.getRepository(part_price_entity_1.PartPrice);
    const parts = [
        { partName: 'Brake Pads', carMake: 'Toyota', carModel: 'Camry', price: 45.99, source: 'AutoZone', sourceUrl: 'https://autozone.com/brake-pads', partNumber: 'AZ-BP-001' },
        { partName: 'Brake Pads', carMake: 'Toyota', carModel: 'Camry', price: 38.99, source: 'RockAuto', sourceUrl: 'https://rockauto.com/brake-pads', partNumber: 'RA-BP-TC01' },
        { partName: 'Brake Pads', carMake: 'Toyota', carModel: 'Camry', price: 49.99, source: 'OReilly', sourceUrl: 'https://oreillyauto.com/brake-pads', partNumber: 'OR-BP-TC01' },
        { partName: 'Brake Pads', carMake: 'Honda', carModel: 'Civic', price: 39.99, source: 'AutoZone', sourceUrl: 'https://autozone.com/brake-pads-honda', partNumber: 'AZ-BP-002' },
        { partName: 'Brake Pads', carMake: 'Honda', carModel: 'Civic', price: 35.50, source: 'RockAuto', sourceUrl: 'https://rockauto.com/brake-pads-honda', partNumber: 'RA-BP-HC01' },
        { partName: 'Oil Filter', carMake: 'Toyota', carModel: 'Camry', price: 8.99, source: 'AutoZone', sourceUrl: 'https://autozone.com/oil-filter-toyota', partNumber: 'AZ-OF-001' },
        { partName: 'Oil Filter', carMake: 'Toyota', carModel: 'Camry', price: 6.50, source: 'RockAuto', sourceUrl: 'https://rockauto.com/oil-filter', partNumber: 'RA-OF-TC01' },
        { partName: 'Oil Filter', carMake: 'Ford', carModel: 'F-150', price: 12.99, source: 'AutoZone', sourceUrl: 'https://autozone.com/oil-filter-ford', partNumber: 'AZ-OF-002' },
        { partName: 'Oil Filter', carMake: 'Ford', carModel: 'F-150', price: 10.50, source: 'OReilly', sourceUrl: 'https://oreillyauto.com/oil-filter-ford', partNumber: 'OR-OF-F01' },
        { partName: 'Air Filter', carMake: 'Toyota', carModel: 'Camry', price: 18.99, source: 'AutoZone', sourceUrl: 'https://autozone.com/air-filter-toyota', partNumber: 'AZ-AF-001' },
        { partName: 'Air Filter', carMake: 'Honda', carModel: 'Civic', price: 15.99, source: 'RockAuto', sourceUrl: 'https://rockauto.com/air-filter-honda', partNumber: 'RA-AF-HC01' },
        { partName: 'Spark Plugs', carMake: 'Toyota', carModel: 'Camry', price: 24.99, source: 'AutoZone', sourceUrl: 'https://autozone.com/spark-plugs-toyota', partNumber: 'AZ-SP-001' },
        { partName: 'Spark Plugs', carMake: 'BMW', carModel: '3 Series', price: 45.99, source: 'AutoZone', sourceUrl: 'https://autozone.com/spark-plugs-bmw', partNumber: 'AZ-SP-002' },
        { partName: 'Spark Plugs', carMake: 'BMW', carModel: '3 Series', price: 39.99, source: 'RockAuto', sourceUrl: 'https://rockauto.com/spark-plugs-bmw', partNumber: 'RA-SP-BM01' },
        { partName: 'Battery', carMake: 'Toyota', carModel: 'Camry', price: 119.99, source: 'AutoZone', sourceUrl: 'https://autozone.com/battery-toyota', partNumber: 'AZ-BAT-001' },
        { partName: 'Battery', carMake: 'Toyota', carModel: 'Camry', price: 109.00, source: 'RockAuto', sourceUrl: 'https://rockauto.com/battery-toyota', partNumber: 'RA-BAT-TC01' },
        { partName: 'Alternator', carMake: 'Honda', carModel: 'Accord', price: 199.99, source: 'AutoZone', sourceUrl: 'https://autozone.com/alternator-honda', partNumber: 'AZ-ALT-001' },
        { partName: 'Alternator', carMake: 'Honda', carModel: 'Accord', price: 179.00, source: 'RockAuto', sourceUrl: 'https://rockauto.com/alternator-honda', partNumber: 'RA-ALT-HA01' },
        { partName: 'Radiator', carMake: 'Toyota', carModel: 'Camry', price: 189.99, source: 'AutoZone', sourceUrl: 'https://autozone.com/radiator-toyota', partNumber: 'AZ-RAD-001' },
        { partName: 'Radiator', carMake: 'Honda', carModel: 'Civic', price: 165.00, source: 'RockAuto', sourceUrl: 'https://rockauto.com/radiator-honda', partNumber: 'RA-RAD-HC01' },
        { partName: 'Timing Belt', carMake: 'Honda', carModel: 'Civic', price: 35.99, source: 'AutoZone', sourceUrl: 'https://autozone.com/timing-belt-honda', partNumber: 'AZ-TB-001' },
        { partName: 'Timing Belt', carMake: 'Toyota', carModel: 'Camry', price: 29.99, source: 'RockAuto', sourceUrl: 'https://rockauto.com/timing-belt-toyota', partNumber: 'RA-TB-TC01' },
    ];
    const existing = await partPriceRepository.count();
    if (existing > 0) {
        console.log(`Seed skipped — ${existing} part prices already exist`);
        await app.close();
        return;
    }
    for (const part of parts) {
        await partPriceRepository.save(partPriceRepository.create(part));
    }
    console.log(`Seeded ${parts.length} part price records`);
    await app.close();
}
seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map