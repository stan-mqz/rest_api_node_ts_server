import request from 'supertest'
import server from '../../server'

describe('POST / products', () => {

    test('It should display validation errors', async () => {
        const response = await request(server).post('/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)
    })

    test('It should display validation errors if price is not greater than 0', async () => {
        const response = await request(server).post('/products').send({
            name: 'Laptopt',
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
    })

    test('It should validate price is a number', async () => {
        const response = await request(server).post('/products').send({
            name: 'Laptopt',
            price: "string"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
    })

   test('It should create a new product', async () => {
    const response = await request(server).post('/products').send({
        name: 'Product 1 - Testing',
        price: 100
    })

    expect(response.status).toBe(201)
    expect(response.status).not.toBe(404)
    expect(response.body).toHaveProperty('data')
    expect(response.body).not.toHaveProperty('errors')
   })
})

describe('GET /products/id', () => {

    test('It should check if /products url exists', async () => {
        const response = await request(server).get('/products')
        expect(response.status).not.toBe(404)
    })

    test('It should return a JSON with products', async () => {
        const response = await request(server).get('/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty('errors')
        expect(response.status).not.toBe(404)

    })
})