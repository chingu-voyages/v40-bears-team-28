import database from '../database'

export type Book = {
  id?: string
  title: string
  author: string
  description: string
  publisher: string
  publish_year: number
  pages: number
  avg_rating: number
  cover: string
  currently_reading: number
}

export class BooksModel {
  async index(): Promise<Book[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM books`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all books, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<Book> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM books
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get book, ${(error as Error).message}`)
    }
  }

  async create(book: Book): Promise<Book> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO books (title, author, description, publisher, publish_year, pages, avg_rating, cover,
                                      currently_reading)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                   RETURNING *`
      const results = await connect.query(sql, [book.title, book.author, book.description, book.publisher, book.publish_year, book.pages, book.avg_rating, book.cover, book.currently_reading])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create book, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<Book> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM books
                   WHERE id = $1
                   RETURNING *`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete books, ${(error as Error).message}`)
    }
  }
}