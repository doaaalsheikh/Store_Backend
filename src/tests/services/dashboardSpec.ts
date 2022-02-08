import { Orders } from '../../db/models/order'
import { Users } from '../../db/models/user'
import { Products } from '../../db/models/product'
import { Categories } from '../../db/models/category'
import { Dashboard } from '../../services/dashboard'
import { User, Category, Product, Order } from '../../types/types'

const myDashboard = new Dashboard()
const myOrders = new Orders()
const myUsers = new Users()
const myProducts = new Products()
const myCategories = new Categories()

describe('Dashboard', () => {
    describe('Test method (productsByCategory)', () => {
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
            const product = await myProducts.addProduct(myProduct)
            myProduct.id = product.id
            myProduct.category_id = myCategory.id
        })

        afterAll(async () => {
            await myProducts.deleteProduct(myProduct.id as unknown as number)
            await myCategories.deleteCategory(myCategory.id as unknown as number)

        })


        //test for productsByCategory method existence
        it('should have productsByCategory method', () => {
            expect(myDashboard.productsByCategory).toBeDefined()
        })
        //test for productsByCategory method performance
        it('productsByCategory method should return list of products by category Id', async () => {
            const result = await myDashboard.productsByCategory(myCategory.id as unknown as number)
            expect(result).toEqual([])
        })
    })
    describe('Test method (getOrdersByUser)', () => {
        const myOrder: Order = {
            order_status: 'active'
        }
        const myUser: User = {
            username: 'testUser',
            first_name: 'fName',
            last_name: 'lName',
            password: 'test'
        }
        beforeAll(async () => {
            const user = await myUsers.addUser(myUser)
            myUser.id = user.id

            const order = await myOrders.addOrder(myOrder)
            myOrder.id = order.id
            myOrder.user_id = myUser.id
        })
        afterAll(async () => {
            await myOrders.deleteOrder(myOrder.id as unknown as number)
            await myUsers.deleteUser(myUser.id as unknown as number)
        })
        //test for getOrdersByUser method existence
        it('Should have getOrdersByUser method', () => {
            expect(myDashboard.getOrdersByUser).toBeDefined()
        })
        //test for getOrdersByUser method performance
        it('getOrdersByUser method should return a list of orders by userId', async () => {
            const result = await myDashboard.getOrdersByUser(myUser.id as unknown as number, myOrder.order_status as string)
            expect(result).toEqual([])
        })
    })
})