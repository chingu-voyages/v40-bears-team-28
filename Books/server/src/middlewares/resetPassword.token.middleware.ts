import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import { StatusError } from './error.middleware'

const resetPasswordError = (next: NextFunction) => {
  const error: StatusError = new Error('Error occurred while resetting password, please try again')
  error.status = 401
  next(error)
}
const validateResetPasswordToken = (request: Request, response: Response, next: NextFunction) => {
  try {
    const authorizationHeader = request.headers.authorization as string
    const token = authorizationHeader?.split(' ')[1]
    const decode = jwt.verify(token, config.resetPasswordSecret as unknown as string)
    if (decode) {
      next()
    } else {
      resetPasswordError(next)
    }
  } catch (error) {
    resetPasswordError(next)
  }
}

export default validateResetPasswordToken