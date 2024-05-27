const request = require('supertest');
const app = require('../../src/App');

describe('Sanity check', () => {
    test('Inventory should contain at least one product', () => {
        const inventory = [
            {   product_id: 1,
                product_name: "TV",
                cat_id: 1,
                sup_id: 3,
                product_desc: "High-definition television",
                quantity: 2,
                price: "$499.99",}
        ]
        expect(inventory.length).toBe(1);
    })
});

describe('404 Test', () => {
    test('Should return 404 for missing route.', async () => {
        const response = await request(app).put('/non-exsistent');
        expect(response.statusCode).toBe(404);
   
    });
});