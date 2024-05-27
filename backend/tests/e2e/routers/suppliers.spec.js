const request = require("supertest");
const app = require('../../../src/App');
const utils = require('../../utils');

describe('Suppliers routes', () => {
    const dummySuppliers = [
        {supp_id: 1, supp_name:'Jamar', supp_email:'jamar@jamar.com', supp_contact: '123'},
        {supp_id: 2, supp_name:'structure', supp_email:'structure@structure.com', supp_contact: '438'}
    ];
    
    beforeEach(async () => { //Function that runs before any test
        await utils.initializeDB();
        await utils.addToDB('Suppliers', ['supp_name', 'supp_email', 'supp_contact'], dummySuppliers)
    });

    describe('suppliers/create', () => {
        test('should create a new supplier', async () => {

            const newSupplier = {supp_id: 3, name:'Amazon', email:'sales@amazon.com', contact:'1233444'}

            const response = await request(app).post('/suppliers/create').send(newSupplier)
            const dbSuppliers = await utils.getRecordFromDB('Suppliers', 'supp_name', newSupplier.name)

            expect(response.statusCode).toBe(200)
            expect(dbSuppliers.supp_name).toMatch(newSupplier.name)
        })
    })

    describe('/suppliers/all', () => {
        test('Should return all suppliers', async () => {
            const response = await request(app).get('/suppliers/all')
            
            expect(response.statusCode).toBe(200)
            expect(response.body.length).toBe(dummySuppliers.length)
            expect(response.body).toMatchObject(dummySuppliers)
        })
    })

    describe('/suppliers/id', () => {
        test('Should return a supplier by Id', async() => {

            const response = await request(app).get(`/suppliers/${dummySuppliers[0].supp_id}`)

            expect(response.statusCode).toBe(200)
            expect(response.body).toMatchObject(dummySuppliers[0])
        })
    })

    describe('suppliers/id Delete', () => {
        test('Should delete a supplier by Id', async() => {

            const response = await request(app).delete(`/suppliers/${dummySuppliers[1].supp_id}`)
            const deletedSupplier = await utils.getRecordFromDB('Suppliers', 'supp_name', dummySuppliers[1].supp_name)

            expect(response.statusCode).toBe(200)
            expect(deletedSupplier).toBeUndefined()

        })
    })

})