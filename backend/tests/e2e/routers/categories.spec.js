const request = require("supertest");
const app = require('../../../src/App');
const utils = require('../../utils');

describe('Categories routes', () => {
    const dummyCategories = [{category_id: 1, category_name: 'Cars'}, {category_id: 2, category_name: 'Clothing'}, {category_id: 3, category_name: 'Electronics'}]
    
    beforeEach(async () => { //Function that runs before any test
        await utils.initializeDB();
        await utils.addToDB('Categories', ['category_name'], dummyCategories)
    });

    describe('categories/create', () => {
        test('should create a new category', async () => {

            const newCategory = {name:'testCategory'}

            const response = await request(app).post('/categories/create').send(newCategory)
            const dbCategories = await utils.getRecordFromDB('Categories', 'category_name', newCategory.name)

            expect(response.statusCode).toBe(200)
            expect(dbCategories.category_name).toMatch(newCategory.name)
        })
    })

    describe('/categories/all', () => {
        test('Should return all categories', async () => {
            const response = await request(app).get('/categories/all')
            
            expect(response.statusCode).toBe(200)
            expect(response.body.length).toBe(dummyCategories.length)
            expect(response.body).toMatchObject(dummyCategories)
        })
    })

    describe('categories/id', () => {
        test('Should return a category by Id', async() => {

            const response = await request(app).get(`/categories/${dummyCategories[0].category_id}`)

            expect(response.statusCode).toBe(200)
            expect(response.body).toMatchObject(dummyCategories[0])
        })
    })

    describe('categories/id Delete', () => {
        test('Should delete a category by Id', async() => {

            const response = await request(app).delete(`/categories/${dummyCategories[1].category_id}`)
            const deletedCategory = await utils.getRecordFromDB('Categories', 'category_name', dummyCategories[1].category_name)

            expect(response.statusCode).toBe(200)
            expect(deletedCategory).toBeUndefined()

        })
    })

})