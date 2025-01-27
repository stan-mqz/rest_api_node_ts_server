import request from 'supertest'
import server from '../../server'

describe('POST / Product', () => {

    test('It should display validation errors', async () => {
        const response = await request(server).post('/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)
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