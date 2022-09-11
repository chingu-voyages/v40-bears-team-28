import axios from "axios";

import { AuthUser } from "../context/auth.context";

type GetUserArgs = {
  controller: AbortController;
};

type DeleteUserSessionArgs = {
  controller: AbortController;
  token: string;
};

export async function getUser({ controller }: GetUserArgs): Promise<AuthUser> {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    signal: controller.signal,
  };
  const response = await axios.get(
    "https://books-fkzm.onrender.com/api/users/auth/session",
    config
  );
  return response.data.data;
}

export async function deleteUserSession({
  controller,
  token,
}: DeleteUserSessionArgs): Promise<void> {
  const config = {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    withCredentials: true,
    signal: controller.signal,
  };
  const response = await axios.get("https://books-fkzm.onrender.com/api/users/auth/logout", config);
  return response.data;
}
