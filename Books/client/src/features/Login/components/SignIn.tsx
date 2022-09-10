import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ArrowIcon } from "../../../assets/images/arrow-icon.svg";
import { ReactComponent as BookIcon } from "../../../assets/images/book-icon.svg";
import useSignIn from "../hooks/useSignIn";

type SignInProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

function SignIn({ setLogin }: SignInProps) {
  const { formik, errorMsg, register } = useSignIn({ setLogin });
  const { touched, handleSubmit, handleBlur, handleChange, errors, values } = formik;
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
          <h2 className="text-center">Sign In</h2>
          {errorMsg && <p className="login-form__error-msg text-center">{errorMsg}</p>}
          <label className="login-form__label">
            E-mail address
            <input
              type="email"
              name="email"
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
          <label className="login-form__label">
            Password
            <input
              type="password"
              name="password"
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
          <button type="submit" className="login-form__submit">
            Sign In
          </button>
        </form>
        <div className="login-form__links">
          <button onClick={register}>Register</button>
          {/* <button>Forgot Password?</button> */}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
