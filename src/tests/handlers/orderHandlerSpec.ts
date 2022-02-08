import supertest from 'supertest'
import { Categories } from '../../db/models/category'
import { Orders } from '../../db/models/order'
import { OrderProducts } from '../../db/models/orderProduct'
import { Products } from '../../db/models/product'
import { Users } from '../../db/models/user'
import app from '../../server'
import { Category, Order, OrderProduct, Product, User } from '../../types/types'

// create a request object
const request = supertest(app)

describe('Test Orders Endpoints', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVVzZXIiOnsiaWQiOjExLCJmaXJzdF9uYW1lIjoiZm5hbWUxIiwibGFzdF9uYW1lIjoibG5hbWUxIiwidXNlcm5hbWUiOiJmaXJzdFVzZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRWOTQ4Q2NTejY4UUI2NDRnWjdOdUJlSHowOTVORnFvLjhPNktrbmdrcXVYQW5EZnB2cWhNUyJ9LCJpYXQiOjE2NDE2MDQ4NzN9.RLureeERQFQ_O1TEPIhifAQSXoVrrjBCUT69slZqgHA'
    const myOrders = new Orders()
    const myUsers = new Users()
    const myProducts = new Products()
    const myCategories = new Categories()
    const myOrderProducts = new OrderProducts()

    const myUser: User = {
        username: 'testUser',
        first_name: 'fName',
        last_name: 'lName',
        password: 'test'
    }
    const myCategory: Category = {
        category_name: 'category1'
    }
    const myOrder: Order = {
        order_status: 'active'
    }
    const myProduct: Product = {
        product_name: 'product1',
        product_price: 100
    }
    const myOrderProduct: OrderProduct = {
        product_quantity: 5
    }
    beforeAll(async () => {
        // add user before all test specs of Order
        const user = await myUsers.addUser(myUser)
        myUser.id = user.id
        myOrder.user_id = myUser.id

        // add category before all test specs of order start
        const category = await myCategories.addCategory(myCategory)
        myCategory.id = category.id
        myProduct.category_id = category.id

        // add order before all test specs of order start
        const order = await myOrders.addOrder(myOrder)
        myOrder.id = order.id
        myOrderProduct.order_id = myOrder.id

        // add product before all test specs of order start
        const product = await myProducts.addProduct(myProduct)
        myProduct.id = product.id
        myOrderProduct.product_id = myProduct.id
    })

    afterAll(async () => {
        // delete all created raws after all test of order ends
        await myOrders.deleteOrder(myOrder.id as unknown as number)
        await myUsers.deleteUser(myUser.id as unknown as number)
        await myProducts.deleteProduct(myProduct.id as unknown as number)
        await myCategories.deleteCategory(myCategory.id as unknown as number)
        await myOrderProducts.deleteOrderProduct(myOrderProduct.id as unknown as number)
    })

    it('should add order detail', async () => {
        const response = await request.post('/orders/').send(myOrderProduct).set('Authorization', 'Bearer ' + token);
        myOrderProduct.id = response.body.id
        expect(response.status).toBe(200)
    })
})
