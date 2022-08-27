import useSignUp from '../hooks/useSignUp'
import React from 'react'

type SignUpProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function SignUp({ setLogin }: SignUpProps) {
  const { formik, login, errorMsg } = useSignUp({ setLogin })
  const { errors, handleChange, handleBlur, handleSubmit, touched, values } = formik
  return (
    <div className='login-form-container'>
      <h2>Sign up</h2>
      <p className='login-form__error-msg'>{errorMsg}</p>
      <form onSubmit={handleSubmit} className='login-form'>
        <fieldset>
          <label htmlFor='username' className='login-form__label'>Username</label>
          <input type='text' name='username' id='username'
                 className={touched.username && errors.username ? 'login-form__input error' : 'login-form__input'}
                 autoComplete='off' value={values.username} placeholder='Enter Username'
                 onChange={handleChange} onBlur={handleBlur} />
          <p className='login-form__error-msg'>{touched.username && errors.username}</p>
        </fieldset>
        <fieldset>
          <label htmlFor='email' className='login-form__label'>Email</label>
          <input type='email' name='email' id='email'
                 className={touched.email && errors.email ? 'login-form__input error' : 'login-form__input'}
                 autoComplete='off' value={values.email} placeholder='Enter Email'
                 onChange={handleChange} onBlur={handleBlur} />
          <p className='login-form__error-msg'>{touched.email && errors.email}</p>
        </fieldset>
        <fieldset>
          <label htmlFor='password' className='login-form__label'>Password</label>
          <input type='password' name='password' id='password'
                 className={touched.password && errors.password ? 'login-form__input error' : 'login-form__input'}
                 autoComplete='off' value={values.password} placeholder='Enter Password'
                 onChange={handleChange} onBlur={handleBlur} />
          <p className='login-form__error-msg'>{touched.password && errors.password}</p>
        </fieldset>
        <fieldset>
          <label htmlFor='confirm-password' className='login-form__label'>Confirm Password</label>
          <input type='password' name='confirmPassword' id='confirm-password'
                 className={touched.confirmPassword && errors.confirmPassword ? 'login-form__input error' : 'login-form__input'}
                 autoComplete='off' value={values.confirmPassword} placeholder='Confirm Password'
                 onChange={handleChange} onBlur={handleBlur} />
          <p className='login-form__error-msg'>{touched.confirmPassword && errors.confirmPassword}</p>
        </fieldset>
        <button type='submit' className='login-form__submit'>Sign up</button>
      </form>
      <button className='return-to-login' onClick={login}>Return to login</button>
    </div>
  )
}

export default SignUp