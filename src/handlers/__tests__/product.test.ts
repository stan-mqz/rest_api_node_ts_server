import request from 'supertest'
import server from '../../server'

describe('POST / Product', () => {
   test('It should create a new product', async () => {
    const response = await request(server).post('/products').send({
        name: 'Product 1 - Testing',
        price: 100
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data')
   })
})