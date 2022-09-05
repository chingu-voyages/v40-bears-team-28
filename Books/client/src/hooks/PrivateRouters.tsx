import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

function useAuth() {
  const { user } = useContext(AuthContext);
  return user.token;
}

function PrivateRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
