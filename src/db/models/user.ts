import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import client from '../database'
import { User } from '../../types/types'


dotenv.config()
const saltRounds = process.env.SALT_ROUNDS as string
const pepper = process.env.BCRYPT_PASSWORD as string

export class Users {

  // Data access method to select all users from Database
  async selectAllUsers(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users;'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  // Data access method to select user by ID from database
  async selectUserByID(id: number): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE id = $1;'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldn't find user no. ${id}, Error:${error}`)
    }
  }

  // Data access method to delete user by ID from Database
  async deleteUser(id: number): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM users WHERE id = $1 RETURNING *;'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldn't delete user no. ${id}, Error:${error}`)
    }
  }

  // Data access method to add new user to Database
  async addUser(user: User): Promise<User> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *;'
      const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds))
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.username,
        hash
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldn't add user "${user.username}", Error:${error}`)
    }
  }

  // Data access method to check user authentication
  async authenticate(username: string, password: string): Promise<User | undefined> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE username=$1'
      const result = await conn.query(sql, [username])

      if (result.rows.length > 0) {
        const user = result.rows[0]
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user
        }
      }
      else {
        throw new Error('No user found');
      }
    }
    catch (error) {
      throw new Error('Login error.. Authetication failed!');
    }
  }
}
