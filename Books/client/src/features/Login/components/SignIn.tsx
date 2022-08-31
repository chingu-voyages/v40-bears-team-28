import React from 'react';

import useSignIn from '../hooks/useSignIn';

type SignInProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

function SignIn({ setLogin }: SignInProps) {
  const { formik, errorMsg, register } = useSignIn({ setLogin });
  const { touched, handleSubmit, handleBlur, handleChange, errors, values } = formik;
  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <p className="login-form__error-msg">{errorMsg}</p>
      <form onSubmit={handleSubmit} className="login-form">
        <fieldset>
          <label htmlFor="email" className="login-form__label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={
              touched.email && errors.email ? 'login-form__input error' : 'login-form__input'
            }
            autoComplete="off"
            value={values.email}
            placeholder="Enter Email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="login-form__error-msg">{touched.email && errors.email}</p>
        </fieldset>
        <fieldset>
          <label htmlFor="password" className="login-form__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={
              touched.password && errors.password ? 'login-form__input error' : 'login-form__input'
            }
            autoComplete="off"
            value={values.password}
            placeholder="Enter Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="login-form__error-msg">{touched.password && errors.password}</p>
        </fieldset>
        <div className="login-form__register">
          <button onClick={register}>Register</button>
          <button>Forget Password?</button>
        </div>
        <button type="submit" className="login-form__submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;
