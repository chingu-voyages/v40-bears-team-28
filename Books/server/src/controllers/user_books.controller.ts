import { BooksModel } from '../models/books.model'
import { UserBooksModel } from '../models/user_books.model'
import { Request, Response, NextFunction } from 'express'

const booksModel = new BooksModel()
const userBooksModel = new UserBooksModel()

export const getAllUserBooks = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userBooks = await userBooksModel.index()
    response.status(200).json({
      status: 'Success',
      data: [...userBooks],
      message: 'All user books got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getUserBooks = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = request.params.id
    const userBooks = await userBooksModel.showByUserId(userId)
    if (userBooks) {
      response.status(200).json({
        status: 'Success',
        data: [...userBooks],
        message: 'User books got retrieved successfully'
      })
    } else {
      response.status(404).json({
        status: 'Failed',
        message: 'There is no books for that user id'
      })
    }
  } catch (error) {
    next(error)
  }
}
export const checkSavedBookForUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.params.id
    const bookId = request.params.book_id
    const checkUserBook = await userBooksModel.showByUserIdAndBookId(userId, bookId)
    if (checkUserBook) {
      response.status(200).json({
        status: 'Success',
        data: { savedBook: true },
        message: 'Book is saved for user'
      })
      return
    } else {
      response.status(200).json({
        status: 'Success',
        data: { savedBook: false },
        message: 'Book is saved for user'
      })
      return
    }
  } catch (error) {
    next(error)
  }
}
export const createUserBook = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id, title, authors, description, publisher, pages, year, image, url } = request.body
    const userId = request.params.id
    const book = {
      book_id: id.replace(/[A-Za-z]/, ''),
      title,
      authors,
      description,
      publisher,
      pages,
      year,
      image,
      url
    }
    const checkBook = await booksModel.showByBookId(book.book_id)
    if (checkBook) {
      const newUserBook = await userBooksModel.create(userId, book.book_id)
      response.status(200).json({
        status: 'Success',
        data: { ...newUserBook },
        message: 'New user book got created successfully'
      })
    } else {
      const newBook = await booksModel.create(book)
      const newUserBook = await userBooksModel.create(userId, book.book_id)
      response.status(200).json({
        status: 'Success',
        data: { ...newUserBook },
        message: 'New user book got created successfully'
      })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteUserBook = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = request.params.id
    const bookId = request.params.book_id
    const checkUserBook = await userBooksModel.showByUserIdAndBookId(userId, bookId)
    if (checkUserBook) {
      const deletedUserBook = await userBooksModel.delete(userId, bookId)
      response.status(202).json({
        status: 'Success',
        data: { ...deletedUserBook },
        message: 'User book got deleted successfully'
      })
    } else {
      response.status(404).json({
        status: 'Failed',
        message: 'User book is not exist'
      })
    }
  } catch (error) {
    next(error)
  }
}
