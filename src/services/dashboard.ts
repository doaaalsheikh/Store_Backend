import client from '../db/database'

export class Dashboard {
  // Data access method to select orders by user id
  // async getOrdersByUser(userId: number, orderStatus: string): Promise<{ id: number, order_id: number, user_id: number, order_status: string, product_name: string, product_quantity: number }[]> {
  async getOrdersByUser(userId: number, orderStatus: string): Promise<{ order_id: number, user_id: number, order_status: string }[]> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT * FROM orders WHERE user_id= $1 AND order_status = $2'
      // 'SELECT order_products.id, order_products.order_id , orders.user_id, orders.order_status, products.product_name, order_products.product_quantity FROM orders INNER JOIN order_products ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id WHERE user_id= $1 AND order_status = $2'
      const result = await conn.query(sql, [userId, orderStatus])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`There is no Open orders, Error ${error}`)
    }
  }

  // Data access method to view products by category 
  async productsByCategory(categoryId: number): Promise<
    { product_id: number, product_name: string, product_price: number, category_id: number, category_name: string }[]> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT products.id as product_id, products.product_name, products.product_price, categories.id as category_id, categories.category_name FROM products INNER JOIN categories ON products.category_id = categories.id WHERE categories.id = $1;'
      const result = await conn.query(sql, [categoryId])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error in getting products ${error}`)
    }
  }

}