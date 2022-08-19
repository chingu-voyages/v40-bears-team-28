import { UsersModel, User } from '../models/users.model'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import { compareSync } from 'bcrypt'

const usersModel = new UsersModel()

export const getAllUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await usersModel.index()
    response.status(200).json({
      status: 'Success',
      data: [...users],
      message: 'Users got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = request.params.id
    const user = await usersModel.show(id)
    response.status(200).json({
      status: 'Success',
      data: { ...user },
      message: 'User got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newUser = {
      username: request.body.username,
      email: request.body.email,
      image: request.body.image,
      is_verified: false,
      password: request.body.password
    } as User
    const checkEmail = await usersModel.showByEmail(newUser.email)
    if (checkEmail) {
      response.status(409).json({ status: 'Failed', message: 'Email is already used' })
      return
    }
    const user = await usersModel.create(newUser)
    const token = jwt.sign({ user: user }, config.token as unknown as string)
    response.status(201).json({
      statue: 'Success',
      data: {
        ...user,
        token
      },
      message: 'User got created successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = {
      username: request.body.username,
      email: request.body.email,
      image: request.body.image
    } as User
    const id = request.params.id
    if (user.email) {
      const getUser = await usersModel.show(id)
      const checkEmail = await usersModel.showByEmail(user.email)
      if (checkEmail && getUser.email !== user.email) {
        response.status(409).json({
          status: 'Failed', message: 'This email is already used please use another email'
        })
        return
      }
    }
    const updatedUser = await usersModel.update(id, user)
    const token = jwt.sign({ user: updatedUser }, config.token as unknown as string)
    response.status(200).json({
      status: 'Success',
      data: {
        ...updatedUser,
        token
      },
      message: 'User got updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const changePassword = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = request.headers.authorization as string
    const oldToken = authorizationHeader?.split(' ')[1]
    const decode = jwt.decode(oldToken)
    const password = request.body.password
    if (decode) {
      // @ts-ignore
      const email = decode['user'].email
      const getUserPassword = await usersModel.showPassword(email)
      const checkPassword = compareSync(password + config.pepper, getUserPassword.password)
      if (checkPassword) {
        response.status(409).json({
          status: 'Failed',
          message: 'new password cant be the same as old password'
        })
        return
      }
      await usersModel.updatePassword(email, password)
      response.status(200).json({
        status: 'Success',
        message: 'Password got changed successfully'
      })
    }
  } catch (error) {
    next(error)
  }
}

export const checkEmailExistence = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = request.body.email
    const user = await usersModel.showByEmail(email)
    if (user) {
      const token = jwt.sign({ user }, config.secondToken as unknown as string)
      response.status(200).json({
        status: 'Success',
        data: { ...user, token },
        message: 'User got retrieved successfully'
      })
    } else {
      response.status(204).json({
        status: 'Failed',
        message: 'Email is not exist'
      })
    }
  } catch (error) {
    next(error)
  }
}

export const forgotPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = request.headers.authorization as string
    const oldToken = authorizationHeader?.split(' ')[1]
    const decode = jwt.decode(oldToken)
    const password = request.body.password
    // @ts-ignore
    const email = decode['user'].email
    const updatedUser = await usersModel.updatePassword(email, password)
    const token = jwt.sign({ user: updatedUser }, config.token as unknown as string)
    response.status(200).json({
      status: 'Success',
      data: {
        ...updatedUser,
        token
      },
      message: 'Password get updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = request.body.email
    const checkEmail = await usersModel.showByEmail(email)
    if (checkEmail) {
      const deleteUser = await usersModel.delete(email)
      response.status(202).json({
        status: 'Success',
        data: { ...deleteUser },
        message: 'User got deleted successfully'
      })
    } else {
      response.status(404).json({ status: 'Success', message: 'User is not exist' })
    }
  } catch (error) {
    next(error)
  }
}

export const authenticateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userToAuthenticate = {
      email: request.body.email,
      password: request.body.password
    } as User
    const authenticatedUser = await usersModel.authenticate(userToAuthenticate)
    const token = jwt.sign({ user: authenticatedUser }, config.token as unknown as string)
    if (!authenticatedUser) {
      response.status(401).json({ status: 'Unauthorized user', message: 'Password is wrong' })
      return
    } else {
      response.status(200).json({
        status: 'success',
        data: {
          ...authenticatedUser,
          token
        },
        message: 'User got authenticated successfully'
      })
    }
  } catch (error) {
    next(error)
  }
}
