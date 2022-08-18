import { Router } from 'express'
import validateToken from '../../middlewares/token.middleware'
import {
  authenticateUser,
  changePassword,
  checkEmailExistence,
  createUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUser,
  updateUser
} from '../../controllers/users.controller'
import validateSecondToken from '../../middlewares/secondToken.middleware'

const usersRoutes = Router()

usersRoutes
  .route('/users')
  .get(validateToken, getAllUsers)
  .post(createUser)
  .patch(validateToken, changePassword)
  .delete(validateToken, deleteUser)

usersRoutes.route('/users/:id').get(validateToken, getUser).put(validateToken, updateUser)

usersRoutes.route('/users/check-email').post(checkEmailExistence)

usersRoutes.route('/users/forgot-password').patch(validateSecondToken, forgotPassword)

usersRoutes.route('/users/authenticate').post(authenticateUser)

export default usersRoutes