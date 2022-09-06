/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getBookById } from "../api/dbooks.api";
import { Book } from "../api/types";
import { saveBook, deleteSavedBook } from "../api/user_books.api";
import { AuthContext } from "../context/auth.context";

function BookPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState<Book>({} as Book);
  const [toggle, setToggle] = useState<boolean | null>(null);
  const [bookmark, setBookmark] = useState("disable");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    if (id) {
      getBookById({ controller, id })
        .then((data) => {
          setBook(data);
        })
        .catch((error) => {
          setBook({} as Book);
          setToggle(null);
          setErrorMsg("");
        });
    }
    if (toggle) {
      saveBook({ controller, book, user_id: user.id, token: user.token })
        .then((data) => {
          setBookmark("active");
          setErrorMsg("");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setErrorMsg("Please login first so you can save book");
          }
        });
    } else if (toggle === false) {
      deleteSavedBook({ controller, userId: user.id, token: user.token, bookId: book.id }).then(
        (data) => {
          setBookmark("disabled");
          setErrorMsg("");
        }
      );
    }
    return () => {
      controller.abort();
    };
  }, [toggle]);

  function handleSavingBook(event: React.MouseEvent<HTMLButtonElement>) {
    setToggle((prevState) => !prevState);
  }

  return book.title ? (
    <div>
      <p>{errorMsg}</p>
      <p>{book.title}</p>
      <p>{book.publisher}</p>
      <p>{book.description}</p>
      <p>{book.authors}</p>
      <p>{book.pages}</p>
      <img src={book.image} alt="book cover" />
      <button onClick={handleSavingBook} className={bookmark}>
        Save
      </button>
      <a href={`${book.url}/pdf/`}>Read</a>
      <a href={`${book.download}`}>Download</a>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

export default BookPage;
