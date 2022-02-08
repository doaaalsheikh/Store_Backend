import { Products } from '../../../db/models/product'
import { Categories } from '../../../db/models/category'
import { Product, Category } from '../../../types/types'

const myProducts = new Products()
const myCategories = new Categories()

describe('Product Model', () => {
  const myProduct: Product = {
    product_name: 'product1',
    product_price: 2222
  }
  const myCategory: Category = {
    category_name: 'category1'
  }
  describe('Methods of Product model should be defined', () => {
    //test for selectAllProducts method existence
    it('Should have selectAllProducts method', () => {
      expect(myProducts.selectAllProducts).toBeDefined()
    })
    //test for addProduct method existence
    it('should have addProduct method', () => {
      expect(myProducts.addProduct).toBeDefined()
    })
    //test for selectProductByID method existence
    it('should have selectProductByID method', () => {
      expect(myProducts.selectProductByID).toBeDefined()
    })
  })
  describe('Test methods performance', () => {
    beforeAll(async () => {
      // add category before all test specs of product
      const category = await myCategories.addCategory(myCategory)
      myCategory.id = category.id
      myProduct.category_id = category.id
    })

    afterAll(async () => {
      // delete created category after all test ends
      await myCategories.deleteCategory(myCategory.id as unknown as number)
    })

    //test for selectAllProducts method performance
    it('index selectAllProducts should return a list of products', async () => {
      const result = await myProducts.selectAllProducts()
      expect(result).toEqual([])
    })

    //test for addProduct method performance
    it('addProduct method should add a new product', async () => {

      const result = await myProducts.addProduct(myProduct)
      myProduct.id = result.id
      expect(result).toEqual(myProduct)
      await myProducts.deleteProduct(myProduct.id as unknown as number)              // delete recently created product to rollback change in database
    })

    //test for selectProductByID method performance
    it('selectProductByID method should return the correct product', async () => {
      const tempProduct = await myProducts.addProduct(myProduct)                  // temporary product created just for test
      myProduct.id = tempProduct.id
      const result = await myProducts.selectProductByID(myProduct.id as unknown as number)
      expect(result).toEqual(myProduct)
      await myProducts.deleteProduct(myProduct.id as unknown as number)              // temporary product deleted after for test
    })
  })
})