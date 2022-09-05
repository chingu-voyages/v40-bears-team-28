import axios from "axios";

import { Book } from "./types";

type getBookByIdArgs = {
  controller: AbortController;
  id: string;
};

export async function getBookById({ controller, id }: getBookByIdArgs): Promise<Book> {
  const config = {
    headers: { "Content-Type": "application/json" },
    signal: controller.signal,
  };
  const response = await axios.get(`https://www.dbooks.org/api/book/${id}`, config);
  return response.data;
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
