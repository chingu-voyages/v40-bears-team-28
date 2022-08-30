import React, { useContext, useState } from 'react'
import { FormikProps, useFormik } from 'formik'
import { AuthContext, AuthUser } from '../../../context/auth.context'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authUser } from '../api/users.api'

type UseSignInReturn = {
  formik: FormikProps<{ email: string, password: string }>
  register: (event: React.MouseEvent<HTMLButtonElement>) => void
  errorMsg: string
}

type UseSignInArgs = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}


function useSignIn({ setLogin }: UseSignInArgs): UseSignInReturn {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email is required'),
      password: Yup.string().min(8, 'Password is too short').required('Password is required')
    }),
    onSubmit: (values, actions) => {
      setErrorMsg('')
      authUser({ user: values })
        .then(data => {
          if (data.token) {
            setUser(data)
            navigate('/home')
          } else {
            setUser({} as AuthUser)
            navigate('/login')
          }
        })
        .catch(error => {
          setErrorMsg(error.response.data.message)
        })
      actions.resetForm()
    }
  })

  function register(event: React.MouseEvent<HTMLButtonElement>) {
    setLogin(false)
  }

  return {
    formik,
    errorMsg,
    register
  }
}

export default useSignIn