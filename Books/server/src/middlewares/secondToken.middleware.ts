import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import { unauthorizedError } from './token.middleware'

const validateSecondToken = (request: Request, response: Response, next: NextFunction) => {
  try {
    const authorizationHeader = request.headers.authorization as string
    const token = authorizationHeader?.split(' ')[1]
    const decode = jwt.verify(token, config.secondToken as unknown as string)
    if (decode) {
      next()
    } else {
      unauthorizedError(next)
    }
  } catch (error) {
    unauthorizedError(next)
  }
}

export default validateSecondToken