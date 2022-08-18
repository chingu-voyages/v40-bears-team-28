import database from '../database'
import config from '../config'
import { compareSync, hashSync } from 'bcrypt'

export type User = {
  id?: string
  username: string
  email: string
  image: string
  password: string
}

export class UsersModel {
  async index(): Promise<User[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT id, username, email, image
                   FROM users`
      const result = await connect.query(sql)
      connect.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to get all users, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `SELECT id, username, email, image
                   FROM users
                   WHERE id = $1`
      const result = await database.query(sql, [id])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to get user, ${(error as Error).message}`)
    }
  }

  async showPassword(email: string): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `SELECT password
                   FROM users
                   WHERE email = $1`
      const result = await connect.query(sql, [email])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to get user password, ${(error as Error).message}`)
    }
  }

  async showByEmail(email: string): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `SELECT id, username, email, image
                   FROM users
                   WHERE email = $1`
      const result = await connect.query(sql, [email])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to get user by email, ${(error as Error).message}`)
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO users (username, email, image, password)
                   VALUES ($1, $2, $3, $4)
                   RETURNING id, username, email, image`
      const password = hashSync(user.password + config.pepper, config.salt)
      const result = await connect.query(sql, [
        user.username,
        user.email,
        user.image,
        password
      ])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create new user, ${(error as Error).message}`)
    }
  }

  async update(id: string, user: User): Promise<User> {
    try {
      const connect = await database.connect()
      const getUser = await connect.query(
        `SELECT username, email, image
         FROM users
         WHERE id = $1`,
        [id]
      )
      const updatedUser = {
        username: user.username ? user.username : getUser.rows[0].username,
        email: user.email ? user.email : getUser.rows[0].email,
        image: user.image ? user.image : getUser.rows[0].image
      }
      const sql = `UPDATE users
                   SET username=$1,
                       email=$2,
                       image=$3
                   WHERE id = $4
                   RETURNING id, username, email, image`
      const result = await connect.query(sql, [
        updatedUser.username,
        updatedUser.email,
        updatedUser.image,
        id
      ])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to update user, ${(error as Error).message}`)
    }
  }

  async updatePassword(email: string, newPassword: string): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `UPDATE users
                   SET password=$1
                   WHERE email = $2
                   RETURNING id, username, email, image`
      const password = hashSync(newPassword + config.pepper, config.salt)
      const result = await connect.query(sql, [password, email])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to change password, ${(error as Error).message}`)
    }
  }

  async delete(email: string): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM users
                   WHERE email = $1
                   RETURNING id, username, email, image`
      const result = await connect.query(sql, [email])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete user, ${(error as Error).message}`)
    }
  }


  async authenticate(user: User): Promise<User | null> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM users
                   WHERE email = $1`
      const result = await connect.query(sql, [user.email])
      connect.release()
      if (result.rows.length) {
        const { password } = result.rows[0]
        const isPasswordValid = compareSync(user.password + config.pepper, password)
        if (isPasswordValid) {
          return {
            id: result.rows[0].id,
            username: result.rows[0].username,
            email: result.rows[0].email,
            image: result.rows[0].image
          } as User
        } else {
          return null
        }
      } else {
        throw new Error(`Email is not exist, sign up instead`)
      }
    } catch (error) {
      throw new Error(`Unable to login, ${(error as Error).message}`)
    }
  }
}
