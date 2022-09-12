/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./BookPage.scss";

import { getBookById } from "../../../../api/dbooks.api";
import { Book } from "../../../../api/types";
import { saveBook, deleteSavedBook } from "../../../../api/user_books.api";
import { ReactComponent as ArrowIcon } from "../../../../assets/images/arrow-icon.svg";
import { ReactComponent as BookIcon } from "../../../../assets/images/book-icon.svg";
import { ReactComponent as BookmarkIcon } from "../../../../assets/images/bookmark-icon.svg";
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
  }, [toggle]);

  function handleSavingBook(event: React.MouseEvent<HTMLButtonElement>) {
    setToggle((prevState) => !prevState);
  }

  return book.title ? (
    <div className="bookDetails">
      <div className="flex column bookText">
        <div className="backLinkWrapper">
          <button onClick={() => window.history.back()} className="backLink">
            <ArrowIcon className="icon" /> Back
          </button>
        </div>
        <div className="flex bookInformation">
          <img src={book.image} alt="book cover" className="bookCover" />
          <div className="flex column bookText">
            <p>{errorMsg}</p>
            <p className="bookTitle">{book.title}</p>
            <p className="bookAuthors">{book.authors}</p>
            <div className="bookTags">
              <div className="bookTag">
                <p className="bookTagTitle">Originally published</p>{" "}
                <p className="bookTagBody">{book.year}</p>
              </div>
              <div className="bookTag">
                <p className="bookTagTitle">Publisher</p>{" "}
                <p className="bookTagBody">{book.publisher}</p>
              </div>
              <div className="bookTag">
                <p className="bookTagTitle">Pages</p>
                <p className="bookTagBody">{book.pages}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex bookControls">
        <button onClick={handleSavingBook} className={`${bookmark} saveButton`}>
          <BookmarkIcon className="icon" /> {bookmark === "not-saved" ? "Save" : "Remove"}
        </button>
        <a href={`${book.url}/pdf/`} target="_blank" rel="noreferrer" className="readLink">
          <BookIcon className="icon" />
          Read
        </a>
        <a href={`${book.download}`} className="downloadLink">
          Download
        </a>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
