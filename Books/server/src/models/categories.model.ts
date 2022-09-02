import database from '../database'

export type Category = {
  id?: string
  category: string
}

export class CategoriesModel {
  async index(): Promise<Category[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM categories`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all categories, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<Category> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM categories
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get category, ${(error as Error).message}`)
    }
  }

  async create(category: Category): Promise<Category> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO categories (category)
                   VALUES ($1)
                   RETURNING *`
      const results = await connect.query(sql, [category.category])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create category, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<Category> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM categories
                   WHERE id = $1
                   RETURNING *`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete category, ${(error as Error).message}`)
    }
  }
}