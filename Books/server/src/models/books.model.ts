import database from '../database';

export type Book = {
  id?: string
  book_id: number
  title: string
  authors: string
  description: string
  publisher: string
  pages: string
  year: string
  image: string
  url: string
}

export class BooksModel {
  async index(): Promise<Book[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT *
                   FROM books`;
      const results = await connect.query(sql);
      connect.release();
      return results.rows;
    } catch (error) {
      throw new Error(`Unable to get all books, ${(error as Error).message}`);
    }
  }

  async showByBookId(id: number): Promise<Book> {
    try {
      const connect = await database.connect();
      const sql = `SELECT *
                   FROM books
                   WHERE book_id = $1`;
      const results = await connect.query(sql, [id]);
      connect.release();
      return results.rows[0];
    } catch (error) {
      throw new Error(`Unable to get book, ${(error as Error).message}`);
    }
  }

  async create(book: Book): Promise<Book> {
    try {
      const connect = await database.connect();
      const sql = `INSERT INTO books (book_id, title, authors, description, publisher, pages, year, image, url)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                   RETURNING *`;
      const results = await connect.query(sql, [
        book.book_id,
        book.title,
        book.authors,
        book.description,
        book.publisher,
        book.pages,
        book.year,
        book.image,
        book.url,
      ]);
      connect.release();
      return results.rows[0];
    } catch (error) {
      throw new Error(`Unable to create book, ${(error as Error).message}`);
    }
  }

  async delete(id: string): Promise<Book> {
    try {
      const connect = await database.connect();
      const sql = `DELETE
                   FROM books
                   WHERE id = $1
                   RETURNING *`;
      const results = await connect.query(sql, [id]);
      connect.release();
      return results.rows[0];
    } catch (error) {
      throw new Error(`Unable to delete books, ${(error as Error).message}`);
    }
  }
}