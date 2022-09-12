/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BookPage.scss";

import { getBookById } from "../../../../api/dbooks.api";
import { Book } from "../../../../api/types";
import { saveBook, deleteSavedBook } from "../../../../api/user_books.api";
import { AuthContext } from "../../../../context/auth.context";

export function BookPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState<Book>({} as Book);
  const [toggle, setToggle] = useState<boolean | null>(null);
  const [isBookSaved, setIsBookSaved] = useState(false);
  const [bookmark, setBookmark] = useState("not-saved");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    if (id) {
      getBookById({
        controller,
        bookId: id.replace(/[A-Za-z]/, ""),
        userId: user.id,
        token: user.token,
      })
        .then((data) => {
          setBook(data.book);
          if (data.saved?.savedBook) {
            setIsBookSaved(true);
            setBookmark("saved");
            setToggle(true);
          } else {
            setIsBookSaved(false);
            setBookmark("not-saved");
            setToggle(false);
          }
        })
        .catch((error) => {
          setBook({} as Book);
          setToggle(null);
          setErrorMsg("");
        });
    }
    if (!isBookSaved && toggle === true) {
      saveBook({ controller, book, user_id: user.id, token: user.token })
        .then((data) => {
          setBookmark("saved");
          setErrorMsg("");
          setIsBookSaved(true);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setErrorMsg("Please login first so you can save book");
          }
        });
    } else if (isBookSaved && toggle === false) {
      deleteSavedBook({
        controller,
        userId: user.id,
        token: user.token,
        bookId: book.id.replace(/[A-Za-z]/, ""),
      }).then((data) => {
        setBookmark("not-saved");
        setErrorMsg("");
        setIsBookSaved(false);
      });
    }
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <a href={`${book.url}/pdf/`} target="_blank" rel="noreferrer">
        Read
      </a>
      <a href={`${book.download}`}>Download</a>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
