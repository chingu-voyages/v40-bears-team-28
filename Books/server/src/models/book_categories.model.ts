import database from '../database'

export type BookCategory = {
  id?: string
  book_id: string
  category_id: string
}

export class BookCategoriesModel {
  async index(): Promise<BookCategory[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM book_categories`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all book categories, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<BookCategory> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM book_categories
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get book category, ${(error as Error).message}`)
    }
  }

  async create(bookCategory: BookCategory): Promise<BookCategory> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO book_categories (book_id, category_id)
                   VALUES ($1, $2)
                   RETURNING *`
      const results = await connect.query(sql, [bookCategory.book_id, bookCategory.category_id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create book category, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<BookCategory> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM book_categories
                   WHERE id = $1
                   RETURNING *`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete book category, ${(error as Error).message}`)
    }
  }
}