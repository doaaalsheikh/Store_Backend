import client from '../database'
import { Category } from '../../types/types'


export class Categories {
    // Data access method to add new category to Database
    async addCategory(category: Category): Promise<Category> {
        try {
            const conn = await client.connect()
            const sql =
                'INSERT INTO categories(category_name) VALUES ($1) RETURNING *;'
            const result = await conn.query(sql, [category.category_name])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not add category "${category.category_name}", Error ${error}`)
        }
    }

    // Data access method to delete category from Database
    async deleteCategory(id: number): Promise<Category> {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM categories WHERE id = $1 RETURNING *;'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`couldn't delete category no. ${id}, Error:${error}`)
        }
    }

    // Data access method to add new category to Database
    async selectAllCategories(): Promise<Category[]> {
        try {
            const conn = await client.connect()
            const sql =
                'select * from categories;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Could not select categories , Error ${error}`)
        }
    }
}