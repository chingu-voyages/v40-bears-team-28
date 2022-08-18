import { Request, Response, NextFunction } from 'express'
import config from '../config'
import { StatusError } from './error.middleware'
import jwt from 'jsonwebtoken'

export const unauthorizedError = (next: NextFunction) => {
  const error: StatusError = new Error('Login error please try again')
  error.status = 401
  next(error)
}
const validateToken = (request: Request, response: Response, next: NextFunction) => {
  try {
    const authorizationHeader = request.headers.authorization as string
    const token = authorizationHeader?.split(' ')[1]
    const decode = jwt.verify(token, config.token as unknown as string)
    if (decode) {
      next()
    } else {
      unauthorizedError(next)
    }
  } catch (error) {
    unauthorizedError(next)
  }
}

export default validateToken
