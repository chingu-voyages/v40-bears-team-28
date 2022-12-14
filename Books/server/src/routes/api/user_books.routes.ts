import { Router } from 'express'
import authTokenMiddleware from '../../middlewares/auth.token.middleware'
import {
  getAllUserBooks,
  getUserBooks,
  createUserBook,
  deleteUserBook,
  checkSavedBookForUser
} from '../../controllers/user_books.controller'

const userBooksRoutes = Router()

userBooksRoutes.route('/user/books').get(authTokenMiddleware, getAllUserBooks)

userBooksRoutes
  .route('/user/books/:id')
  .get(authTokenMiddleware, getUserBooks)
  .post(authTokenMiddleware, createUserBook)

userBooksRoutes
  .route('/user/books/:id/:book_id')
  .get(authTokenMiddleware, checkSavedBookForUser)
  .delete(authTokenMiddleware, deleteUserBook)

export default userBooksRoutes
