import axios from "axios";

import { Book } from "./types";

type GetBookByIdArgs = {
  controller: AbortController;
  bookId: string;
  userId: string;
  token: string;
};

type GetBookByIdReturn = {
  book: Book;
  saved?: { savedBook: boolean };
};
export async function getBookById({
  controller,
  bookId,
  token,
  userId,
}: GetBookByIdArgs): Promise<GetBookByIdReturn> {
  const dbooksConfig = {
    headers: { "Content-Type": "application/json" },
    signal: controller.signal,
  };
  const config = {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    withCredentials: true,
    signal: controller.signal,
  };
  const response = await axios.get(`https://www.dbooks.org/api/book/${bookId}`, dbooksConfig);
  if (token) {
    const checkIfBookSaved = await axios.get(
      `https://books-fkzm.onrender.com/api/user/books/${userId}/${bookId}`,
      config
    );
    return { book: response.data, saved: checkIfBookSaved.data.data };
  } else {
    return { book: response.data };
  }
}

export async function getRecentBooks(controller: AbortController): Promise<Book[]> {
  const config = {
    headers: { "Content-Type": "application/json" },
    signal: controller.signal,
  };

  const response = await axios.get("https://www.dbooks.org/api/recent", config);
  const books = response.data.books.map((book: Book) => {
    book.id = book.id.replace(/[A-Za-z]/, "");
    return book;
  });
  return books;
}

export async function getRandomCollection(controller: AbortController): Promise<Book[]> {
  const config = {
    headers: { "Content-Type": "application/json" },
    signal: controller.signal,
  };
  const categories = [
    "Computer-Science",
    "Science",
    "Mathematics",
    "Economics",
    "Finance",
    "Business-and-Management",
    "Politics",
    "Government",
    "History",
    "Philosophy",
  ];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const response = await axios.get(`https://www.dbooks.org/api/search/${randomCategory}`, config);
  const books = response.data.books.map((book: Book) => {
    book.id = book.id.replace(/[A-Za-z]/, "");
    return book;
  });
  return books;
}
