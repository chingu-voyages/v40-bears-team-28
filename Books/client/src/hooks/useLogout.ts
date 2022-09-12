import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteUserSession } from "../api/users.api";
import { AuthContext, AuthUser } from "../context/auth.context";

type UseLogoutReturn = {
  logoutUser: () => void;
};
export default function useLogout(): UseLogoutReturn {
  const { user, setUser } = useContext(AuthContext);
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  function logoutUser(): void {
    setLogout(true);
  }

  useEffect(() => {
    const controller = new AbortController();
    if (logout) {
      deleteUserSession({ controller, token: user.token })
        .then(() => {
          setUser({} as AuthUser);
          setLogout(false);
          navigate("/");
        })
        .catch(() => {
          setUser({} as AuthUser);
          setLogout(false);
          navigate("/");
        });
    }
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logout]);

  return {
    logoutUser,
  };
}
