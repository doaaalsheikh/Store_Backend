import { Category, Order, OrderProduct, Product, User } from '../../../types/types'
import { Orders } from '../../../db/models/order'
import { Users } from '../../../db/models/user'
import { Products } from '../../../db/models/product'
import { Categories } from '../../../db/models/category'
import { OrderProducts } from '../../../db/models/orderProduct'

const myOrders = new Orders()
const myUsers = new Users()
const myProducts = new Products()
const myCategories = new Categories()
const myOrderProducts = new OrderProducts

describe('Order Model', () => {
  describe('Methods of Order model should be defined', () => {
    //test for selectAllOrders method existence
    it('Should have selectAllOrders method', () => {
      expect(myOrders.selectAllOrders).toBeDefined()
    })

    //test for addOrder method existence
    it('should have addOrder method', () => {
      expect(myOrders.addOrder).toBeDefined()
    })

    //test for deleteOrder method existence
    it('should have deleteOrder method', () => {
      expect(myOrders.deleteOrder).toBeDefined()
    })

    //test for create method existence
    it('should have addOrderProduct method', () => {
      expect(myOrderProducts.addOrderProduct).toBeDefined()
    })

  })
  describe('Test methods performance', () => {
    const myOrder: Order = {
      order_status: 'active'
    }
    const myCategory: Category = {
      category_name: 'category1'
    }
    const myUser: User = {
      username: 'testUser',
      first_name: 'fName',
      last_name: 'lName',
      password: 'test'
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
    })

    afterAll(async () => {
      // delete all created raws after all test of order ends
      await myOrders.deleteOrder(myOrder.id as unknown as number)
      await myUsers.deleteUser(myUser.id as unknown as number)
      await myProducts.deleteProduct(myProduct.id as unknown as number)
      await myCategories.deleteCategory(myCategory.id as unknown as number)
    })

    //test for selectAllOrders method performance
    it('selectAllOrders method should return a list of orders', async () => {
      const result = await myOrders.selectAllOrders()
      expect(result).toEqual([])
    })

    //test for addOrder method performance
    it('addOrder method should add new order', async () => {
      const result = await myOrders.addOrder(myOrder)
      myOrder.id = result.id

      expect(result).toEqual(myOrder)
      await myOrders.deleteOrder(myOrder.id as unknown as number)
    })

    //test for deleteOrder method performance
    it('deleteOrder method should delete correct order', async () => {

      const tempOrder = await myOrders.addOrder(myOrder)
      const result = await myOrders.deleteOrder(tempOrder.id as unknown as number)
      expect(result).toEqual(tempOrder)
    })

    //test for addOrderProduct method performance
    it('addOrderProduct method should add a new OrderProduct', async () => {
      const tempOrder = await myOrders.addOrder(myOrder)                    // temporary order created just for test
      const product = await myProducts.addProduct(myProduct)                  // temporary product created just for test
      myOrder.id = tempOrder.id
      myProduct.id = product.id
      myOrderProduct.order_id = myOrder.id
      myOrderProduct.product_id = myProduct.id

      const result = await myOrderProducts.addOrderProduct(myOrderProduct)
      myOrderProduct.id = result.id
      expect(result).toEqual(myOrderProduct)

    })
  })
})