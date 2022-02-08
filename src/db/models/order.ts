import client from '../database'
import { OrderProduct, Order } from '../../types/types'

export class Orders {

  // Data access method to select all orders from Database
  async selectAllOrders(): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT * FROM orders;'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not find orders, Error ${error}`)
    }
  }

  // Data access method to add new otder to Database
  async addOrder(order: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO orders(order_status, user_id) VALUES ($1, $2) RETURNING *; '
      const result = (await conn.query(sql, [
        order.order_status,
        order.user_id
      ])).rows[0]
      conn.release()
      return result

    } catch (error) {
      throw new Error(`Could not add new order, Error ${error}`)
    }
  }

  // Data access method to delete otder from Database
  async deleteOrder(id: number): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM orders WHERE id = $1 RETURNING *;'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldn't delete order no. ${id}, Error:${error}`)
    }
  }
}
