import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ArrowIcon } from "../../../assets/images/arrow-icon.svg";
import { ReactComponent as BookIcon } from "../../../assets/images/book-icon.svg";
import useSignUp from "../hooks/useSignUp";

type SignUpProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

function SignUp({ setLogin }: SignUpProps) {
  const { formik, login, errorMsg } = useSignUp({ setLogin });
  const { errors, handleChange, handleBlur, handleSubmit, touched, values } = formik;
  return (
    <div className="login-form-container">
      <div className="main-wrapper">
        <Link to={"../"}>
          <ArrowIcon /> Back
        </Link>
        <figure>
          <blockquote cite="https://developer.mozilla.org/samples/html/figure.html">
            <BookIcon />
            Don’t ever tell anybody anything. If you do, you start missing everybody
          </blockquote>
          <figcaption>-The Catcher in the Rye</figcaption>
        </figure>
      </div>
      <div className="secondary-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="text-center">Sign Up</h2>
          {errorMsg && <p className="login-form__error-msg text-center">{errorMsg}</p>}
          <label htmlFor="username" className="login-form__label">
            Username
            <input
              type="text"
              name="username"
              id="username"
              className={
                touched.username && errors.username
                  ? "login-form__input error"
                  : "login-form__input"
              }
              autoComplete="off"
              value={values.username}
              placeholder="Enter Username"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p className="login-form__error-msg">{touched.username && errors.username}</p>
          </label>

          <label htmlFor="email" className="login-form__label">
            Email
            <input
              type="email"
              name="email"
              id="email"
              className={
                touched.email && errors.email ? "login-form__input error" : "login-form__input"
              }
              autoComplete="off"
              value={values.email}
              placeholder="Enter Email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p className="login-form__error-msg">{touched.email && errors.email}</p>
          </label>
          <label htmlFor="password" className="login-form__label">
            Password
            <input
              type="password"
              name="password"
              id="password"
              className={
                touched.password && errors.password
                  ? "login-form__input error"
                  : "login-form__input"
              }
              autoComplete="off"
              value={values.password}
              placeholder="Enter Password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p className="login-form__error-msg">{touched.password && errors.password}</p>
          </label>
          <label htmlFor="confirm-password" className="login-form__label">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              className={
                touched.confirmPassword && errors.confirmPassword
                  ? "login-form__input error"
                  : "login-form__input"
              }
              autoComplete="off"
              value={values.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p className="login-form__error-msg">
              {touched.confirmPassword && errors.confirmPassword}
            </p>
          </label>

          <button type="submit" className="login-form__submit">
            Sign up
          </button>
        </form>
        <div className="login-form__links">
          <button className="return-to-login" onClick={login}>
            Return to login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
