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

describe('GET /products/:id', () => {
    test('It should return a 404 response for a non-existent product', async () => {
        const productId = 1000
        const response = await request(server).get(`/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    test('It should check a valid ID in the url', async () =>{
        const response = await request(server).get('/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Valor no valido')
    })

    test('It should return a JSON response for a single product', async () =>{

        const response = await request(server).get('/products/1')
        expect(response.status).toBe(200)
    })
})

describe('PUT /products/:id', () => {

    test('It should check a valid ID in the url', async () =>{
        const response = await request(server).put('/products/not-valid-url').send({
            name: "Laptop",
            price: 300,
            availability : true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Valor no valido')
    })

    test('It should display valditation error messages when updating a product', async () => {
        const response = await request(server).put('/products/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)
        expect(response.status).not.toBe(200)
    })

    test('It should validate that price is greater than 0 ', async () => {
        const response = await request(server).put('/products/1').send({
            name: "Laptop",
            price: -300,
            availability : true
        })
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El precio no puede ser negativo')
        expect(response.status).not.toBe(200)
    })

    test('It should return a 404 response for a non-existing-product ', async () => {
        const productId = 2000
        const response = await request(server).put(`/products/${productId}`).send({
            name: "Laptop",
            price: 300,
            availability : true
        })
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
    })

    test('It should update an existing product with valid data', async () => {

        const response = await request(server).put(`/products/1`).send({
            name: "Laptop",
            price: 300,
            availability : true
        })
        expect(response.status).toBe(200)
        expect(response.status).not.toBe(400)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('DELETE /products/:id', () => {
    test('It should check a valid ID', async () => {
        const response = await request(server).delete('/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('Valor no valido')
    })

    test('It should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).delete(`/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
    })

    test('It should delete an existing product', async () => {
        const response = await request(server).delete('/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe('Producto eliminado')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })

})