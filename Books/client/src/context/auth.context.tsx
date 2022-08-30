import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUser } from '../api/users.api'

export type AuthUser = {
  id: string
  username: string
  email: string
  image: string
  is_verified: boolean
  token: string
}
type AuthContextProviderProps = {
  children: React.ReactNode
}
type UserContextType = {
  user: AuthUser
  setUser: React.Dispatch<React.SetStateAction<AuthUser>>
}
export const AuthContext = createContext<UserContextType>({} as UserContextType)

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<AuthUser>({} as AuthUser)
  useEffect(() => {
    const controller = new AbortController()
    getUser({ controller })
      .then(data => {
        if (data.token) {
          setUser(data)
          navigate(location.pathname)
        } else {
          setUser({} as AuthUser)
          navigate('/')
        }
      })
      .catch(error => {
        setUser({} as AuthUser)
      })
    return () => {
      controller.abort()
    }
  }, [])
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider