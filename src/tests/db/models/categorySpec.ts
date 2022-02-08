import { Categories } from '../../../db/models/category'
import { Category } from '../../../types/types'


const myCategories = new Categories()

describe('Category Model', () => {
  const myCategory: Category = {
    category_name: 'category1'
  }
  describe('Methods of Category model should be defined', () => {

    //test for addCategory method existence
    it('should have addCategory method', () => {
      expect(myCategories.addCategory).toBeDefined()
    })

    //test for deleteCategory method existence
    it('should have deleteCategory method', () => {
      expect(myCategories.deleteCategory).toBeDefined()
    })

  })
  describe('Test methods performance', () => {

    //test for addCategory method performance
    it('addCategory method should add a new category', async () => {
      const result = await myCategories.addCategory(myCategory)
      myCategory.id = result.id
      expect(result).toEqual(myCategory)
      await myCategories.deleteCategory(myCategory.id as unknown as number)
    })

    //test for deleteCategory method performance
    it('deleteCategory method should delete correct category', async () => {
      const tempCategory = await myCategories.addCategory(myCategory)
      myCategory.id = tempCategory.id
      const result = await myCategories.deleteCategory(myCategory.id as unknown as number)
      expect(result).toEqual(myCategory)
    })
  })
})