import supertest from 'supertest'
import { Categories } from '../../db/models/category'
import { Orders } from '../../db/models/order'
import { Products } from '../../db/models/product'
import { Users } from '../../db/models/user'
import app from '../../server'
import { Dashboard } from '../../services/dashboard'
import { Category, Order, Product, User } from '../../types/types'

// create a request object
const request = supertest(app)

describe('Test Dashboard Endpoints', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVVzZXIiOnsiaWQiOjExLCJmaXJzdF9uYW1lIjoiZm5hbWUxIiwibGFzdF9uYW1lIjoibG5hbWUxIiwidXNlcm5hbWUiOiJmaXJzdFVzZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRWOTQ4Q2NTejY4UUI2NDRnWjdOdUJlSHowOTVORnFvLjhPNktrbmdrcXVYQW5EZnB2cWhNUyJ9LCJpYXQiOjE2NDE2MDQ4NzN9.RLureeERQFQ_O1TEPIhifAQSXoVrrjBCUT69slZqgHA'
    describe('Test Dashboard Endpoints, Order wise methods', () => {
        const myUsers = new Users()
        const myUser: User = {
            username: 'testUser',
            first_name: 'fName',
            last_name: 'lName',
            password: 'test'
        }
        beforeAll(async () => {
            const user = await myUsers.addUser(myUser)
            myUser.id = user.id
        })
        afterAll(async () => {
            await myUsers.deleteUser(myUser.id as unknown as number)
        })
        it('should get current order by user id', async () => {
            const response = await request.get(`/current-order-by-user/${myUser.id}`).set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(200)
        })

        it(`should get completed orders by user id `, async () => {
            const response = await request.get(`/completed-orders-by-user/${myUser.id}`).set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(200)
        })
    })
    describe('Test Dashboard Endpoints, Product wise method', () => {
        const myCategories = new Categories()

        const myCategory: Category = {
            category_name: 'category1'
        }
        const myProduct: Product = {
            product_name: 'product1',
            product_price: 100
        }
        beforeAll(async () => {
            const category = await myCategories.addCategory(myCategory)
            myCategory.id = category.id
        })

        afterAll(async () => {
            await myCategories.deleteCategory(myCategory.id as unknown as number)

        })
        it(`should get list of products by category id`, async () => {
            const response = await request.get(`/products-by-category/${myCategory.id}`).set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(200)
        })
    })
})
