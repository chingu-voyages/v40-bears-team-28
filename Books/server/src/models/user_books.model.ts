import database from '../database';

type UserBook = {
  id?: string
  user_id: string
  book_id: number
}

export class UserBooksModel {
  async index(): Promise<UserBook[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT *
                   FROM user_books`;
      const results = await connect.query(sql);
      connect.release();
      return results.rows;
    } catch (error) {
      throw new Error(`Unable to get all user books, ${(error as Error).message}`);
    }
  }

  async showByUserId(id: string): Promise<UserBook[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT *
                   FROM user_books
                            INNER JOIN books b on b.book_id = user_books.book_id
                   WHERE user_id = $1`;
      const results = await connect.query(sql, [id]);
      connect.release();
      return results.rows;
    } catch (error) {
      throw new Error(`Unable to get all all user books by user id, ${(error as Error).message}`);
    }
  }

  async showByUserIdAndBookId(userId: string, bookId: number): Promise<UserBook> {
    try {
      const connect = await database.connect();
      const sql = `SELECT *
                   FROM user_books
                   WHERE user_id = $1
                     AND book_id = $2`;
      const results = await connect.query(sql, [userId, bookId]);
      connect.release();
      return results.rows[0];
    } catch (error) {
      throw new Error(`Unable to get user book by user id and book id, ${(error as Error)}`);
    }
  }

  async create(userId: string, bookId: number): Promise<UserBook> {
    try {
      const connect = await database.connect();
      const sql = `INSERT INTO user_books (user_id, book_id)
                   VALUES ($1, $2)
                   RETURNING *`;
      const results = await connect.query(sql, [userId, bookId]);
      connect.release();
      return results.rows[0];
    } catch (error) {
      throw new Error(`Unable to create user book, ${(error as Error).message}`);
    }
  }

  async delete(userId: string, bookId: number): Promise<UserBook> {
    try {
      const connect = await database.connect();
      const sql = `DELETE
                   FROM user_books
                   WHERE user_id = $1
                     AND book_id = $2
                   RETURNING *`;
      const results = await connect.query(sql, [userId, bookId]);
      connect.release();
      return results.rows[0];
    } catch (error) {
      throw new Error(`Unable to delete user book, ${(error as Error).message}`);
    }
  }
}