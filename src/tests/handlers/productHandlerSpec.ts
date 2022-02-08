import { type } from 'os'
import supertest from 'supertest'
import { Products } from '../../db/models/product'
import app from '../../server'
import { Product } from '../../types/types'

// create a request object
const request = supertest(app)

describe('Test Products Endpoints', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVVzZXIiOnsiaWQiOjExLCJmaXJzdF9uYW1lIjoiZm5hbWUxIiwibGFzdF9uYW1lIjoibG5hbWUxIiwidXNlcm5hbWUiOiJmaXJzdFVzZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRWOTQ4Q2NTejY4UUI2NDRnWjdOdUJlSHowOTVORnFvLjhPNktrbmdrcXVYQW5EZnB2cWhNUyJ9LCJpYXQiOjE2NDE2MDQ4NzN9.RLureeERQFQ_O1TEPIhifAQSXoVrrjBCUT69slZqgHA'
    const myProducts = new Products
    const myProduct: Product = {
        product_name: 'product1',
        product_price: 2222
    }
    afterAll(async () => {
        // delete created raws after all test of user ends
        await myProducts.deleteProduct(myProduct.id as unknown as number)
    })

    it('should add new product', async () => {
        const response = await request.post('/products/').set('Authorization', 'Bearer ' + token);
        myProduct.id = response.body.id as unknown as number
        expect(response.status).toBe(200)
    })

    it('should get list of products', async () => {
        const response = await request.get('/products/').set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200)
    })

    it(`should get details of product with  specific id`, async () => {
        const response = await request.get(`/products/${myProduct.id}`).set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200)
    })


})
