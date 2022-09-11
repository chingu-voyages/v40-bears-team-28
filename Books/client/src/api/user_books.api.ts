import axios from "axios";

import { Book } from "./types";

type SaveBookArgs = {
  controller: AbortController;
  book: Book;
  user_id: string;
  token: string;
};

type SavedBook = {
  id: string;
  user_id: string;
  book_id: string;
};

type DeleteBookArgs = {
  controller: AbortController;
  userId: string;
  token: string;
  bookId: string;
};

type GetSavedBooksForUserArgs = {
  controller: AbortController;
  userId: string;
  token: string;
};

export async function saveBook({
  controller,
  book,
  user_id,
  token,
}: SaveBookArgs): Promise<SavedBook> {
  const config = {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    withCredentials: true,
    signal: controller.signal,
  };
  const response = await axios.post(
    `https://books-fkzm.onrender.com/api/user/books/${user_id}`,
    { ...book },
    config
  );
  return response.data.data;
}

export async function deleteSavedBook({
  controller,
  userId,
  token,
  bookId,
}: DeleteBookArgs): Promise<SavedBook> {
  const config = {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    withCredentials: true,
    signal: controller.signal,
  };
  const response = await axios.delete(
    `https://books-fkzm.onrender.com/api/user/books/${userId}/${bookId}`,
    config
  );
  return response.data.data;
}

export async function getSavedBooksForUser({
  controller,
  userId,
  token,
}: GetSavedBooksForUserArgs): Promise<Book[]> {
  const config = {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    withCredentials: true,
    signal: controller.signal,
  };
  const response = await axios.get(
    `https://books-fkzm.onrender.com/api/user/books/${userId}`,
    config
  );
  return response.data.data;
}
