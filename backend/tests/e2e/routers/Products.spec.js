const request = require("supertest");
const app = require('../../../src/App');
const utils = require('../../utils');

describe('Product routes', () => {
    beforeEach(async () => { //Function that runs before any test
        await utils.initializeDB();
    });

    describe('/products/create', ()=>{
        test('should create a product', async()=>{
            const dummy = {
                product_name: "item1",
                SKU: 'item1sku',
                cat_id: 1,
                sup_id: 2,
                product_desc: "item1desc",
                quantity: 2,
                price: 100
            }
            const response = await request(app).post('/products/create').send(dummy) //Agregamos producto a la tabla
            const dbProduct = await utils.getRecordFromDB('Products', 'product_name', dummy.product_name) //Consultamos el producto agregado en la tabla

            expect(response.statusCode).toBe(200)
            expect(dbProduct).toMatchObject(dummy)
        });
    });

describe('Products routes tests', ()=> {
    const dummyProducts = [
        {product_name: "item1", SKU: 'item1sku', cat_id: 1, sup_id: 1, product_desc: "item1desc", quantity: 2, price: 100},
        {product_name: "item2", SKU: 'item2sku', cat_id: 2, sup_id: 2, product_desc: "item2desc", quantity: 3, price: 200},
        {product_name: "item3", SKU: 'item3sku', cat_id: 1, sup_id: 1, product_desc: "item3desc", quantity: 2, price: 300}
    ];

    const dummyCategories = [
        {category_name:'Mueble'},
        {category_name:'animales'}
    ];
    const dummySuppliers = [
        {supp_name:'Jamar', supp_email:'jamar@jamar.com', supp_contact: 123},
        {supp_name:'structure', supp_email:'structure@structure.com', supp_contact: 438}
    ];

    beforeEach(async () => { //Function that runs before any test
        await utils.initializeDB(); 
        await utils.addToDB('Categories', ['category_name'], dummyCategories);
        await utils.addToDB('Suppliers', ['supp_name', 'supp_email', 'supp_contact'], dummySuppliers);
        await utils.addToDB('Products', ['product_name', 'SKU', 'cat_id', 'sup_id', 'product_desc', 'quantity', 'price'], dummyProducts);
    });

    describe('/products/all', ()=>{
            
        test('Should get all products', async()=>{
            const response = await request(app).get('/products/all');
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(dummyProducts.length);           
        });
    });

    describe('/products/:pid', ()=>{
        
        test('Should get product by ID', async () => {
            const productId = 1;
            const response = await request(app).get(`/products/${productId}`);
          
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('product');
            expect(response.body.product.product_id).toBeDefined();
            expect(response.body.product.SKU).toBeDefined();
        });

        test('Should return 404 for non-existent product id', async()=>{
            const productId = 99;
            const response = await request(app).get(`/products/${productId}`);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe('Product not found');
        });
    });

    describe ('/products/:id', ()=>{
        test('Should update product by ID', async () => {
            const productId = 1;
            const updateData = {
                product_name: "updated_item1",
                SKU: 'updated_item1sku',
                cat_id: 1,
                sup_id: 1,
                product_desc: "updated_item1desc",
                quantity: 5,
                price: 150
            };

            const response = await request(app).put(`/products/${productId}`).send(updateData);
            expect(response.statusCode).toBe(200);
            console.log(response.body);
            expect(response.body.message).toBe('Product updated successfully');
            
            const updatedProduct = await utils.getRecordFromDB('Products', 'product_id', productId);
            expect(updatedProduct).toMatchObject({
                product_id: productId,
                ...updateData
            });
        });
    });

    describe('/products/:product_id', () => {
        test('Should delete product by ID', async () => {
            const productId = 1;
            const response = await request(app).delete(`/products/${productId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe(`the product with id '${productId}' was deleted successfully.`);

            const deletedProduct = await utils.getRecordFromDB('Products', 'product_id', productId);
            expect(deletedProduct).toBeUndefined();
        });

    });
});

})