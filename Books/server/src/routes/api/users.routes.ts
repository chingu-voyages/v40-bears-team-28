import { Router } from 'express'
import validateAuthToken from '../../middlewares/auth.token.middleware'
import validateResetPasswordToken from '../../middlewares/resetPassword.token.middleware'
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

const usersRoutes = Router()

usersRoutes
  .route('/users')
  .get(validateAuthToken, getAllUsers)
  .post(createUser)
  .patch(validateAuthToken, changePassword)
  .delete(validateAuthToken, deleteUser)

usersRoutes.route('/users/:id')
  .get(validateAuthToken, getUser)
  .put(validateAuthToken, updateUser)

usersRoutes.route('/users/check-email')
  .post(checkEmailExistence)

usersRoutes.route('/users/forgot-password')
  .patch(validateResetPasswordToken, forgotPassword)

usersRoutes.route('/users/authenticate')
  .post(authenticateUser)

export default usersRoutes