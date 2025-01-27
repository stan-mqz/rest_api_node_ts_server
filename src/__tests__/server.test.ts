import request from "supertest";
import server from "../server";


describe('GET /products', () => {
    test('It should send back a json response', async () => {

        const res = await request(server).get('/products')
        
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)


        expect(res.status).not.toBe(404)
        expect(res.body.message).not.toBe('Not Found')
    })
})
