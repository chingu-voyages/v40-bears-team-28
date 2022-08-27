import axios from 'axios'
import { AuthUser } from '../context/auth.context'

type GetUserArgs = {
  controller: AbortController
}

export async function getUser({ controller }: GetUserArgs): Promise<AuthUser> {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.get('http://localhost:4000/api/users/auth/session', config)
  return response.data.data
}