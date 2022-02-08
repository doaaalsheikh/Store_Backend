import client from '../database'
import { Product } from '../../types/types'

export class Products {

    // Data access method to select all products from Database
    async selectAllProducts(): Promise<Product[]> {
        try {
            const conn = await client.connect()
            const sql =
                'SELECT * FROM products;'
            // 'SELECT products.id, products.product_name, products.product_price, products.category_id, categories.category_name FROM products INNER JOIN categories ON products.category_id = categories.id'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Could not find products, Error ${error}`)
        }
    }

    // Data access method to select specified product from Database
    async selectProductByID(id: number): Promise<Product> {
        try {
            const conn = await client.connect()
            const sql =
                'SELECT * FROM products WHERE id=$1;'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not find product no ${id}, Error ${error}`)
        }
    }

    // Data access method to add new product to Database
    async addProduct(product: Product): Promise<Product> {
        try {
            const conn = await client.connect()
            const sql =
                'INSERT INTO products(product_name, product_price, category_id) VALUES ($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [
                product.product_name,
                product.product_price,
                product.category_id
            ])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not add product "${product.product_name}", Error ${error}`)
        }
    }

    // Data access method to delete product from Database
    async deleteProduct(id: number): Promise<Product> {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM products WHERE id = $1 RETURNING *'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`couldn't delete product no. ${id}, Error:${error}`)
        }
    }
}

