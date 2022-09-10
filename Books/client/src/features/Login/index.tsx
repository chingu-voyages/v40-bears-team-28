import { useContext } from "react";

import { AuthContext } from "../../context/auth.context";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function Login() {
  // To show sign in page if login is true and show sign up page if login is false
  const { login, setLogin } = useContext(AuthContext);
  return <div>{login ? <SignIn setLogin={setLogin} /> : <SignUp setLogin={setLogin} />}</div>;
}

export default Login;
