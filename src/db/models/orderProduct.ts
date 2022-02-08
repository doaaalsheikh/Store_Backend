import client from '../database'
import { OrderProduct, Order } from '../../types/types'

export class OrderProducts {

  // Data access method to add new otderProducts to Database
  async addOrderProduct(orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO order_products (order_id, product_id, product_quantity) VALUES ($1, $2, $3) RETURNING *; '
      const result = (await conn.query(sql, [
        orderProduct.order_id,
        orderProduct.product_id,
        orderProduct.product_quantity
      ])).rows[0]
      conn.release()
      return result

    } catch (error) {
      throw new Error(`Could not add new orderProduct, Error ${error}`)
    }
  }
  // Data access method to delete otderProducts from Database
  async deleteOrderProduct(id: number): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM order_products WHERE id = $1 RETURNING *;'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldn't delete order product no. ${id}, Error:${error}`)
    }
  }
}
