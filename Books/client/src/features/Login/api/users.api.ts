import axios from 'axios'
import { AuthUser } from '../../../context/auth.context'

type AuthUserArgs = {
  user: {
    email: string
    password: string
  }
}

type NewUserArgs = {
  user: {
    username: string
    email: string
    image: string
    password: string
  }
}

export async function authUser({ user }: AuthUserArgs): Promise<AuthUser> {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  }
  const response = await axios.post('http://localhost:4000/api/users/auth', { ...user }, config)
  return response.data.data
}

export async function createUser({ user }: NewUserArgs): Promise<AuthUser> {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  }
  const response = await axios.post('http://localhost:4000/api/users', { ...user }, config)
  return response.data.data
}