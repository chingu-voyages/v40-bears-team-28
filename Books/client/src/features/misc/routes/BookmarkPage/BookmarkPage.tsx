import React, { useContext, useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { getSavedBooksForUser } from "../../../../api/user_books.api";
import { BookOverview } from "../../../../components/BookOverview";
import { Head } from "../../../../components/Head/Head";
import { AuthContext } from "../../../../context/auth.context";
import useWindowSize from "../../../../hooks/useWindowSize";
import { Book } from "../Types";

export function BookmarkPage() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState<Book[]>([]);
  const { width } = useWindowSize();
  useEffect(() => {
    const controller = new AbortController();

    async function fetchBook() {
      const books = await getSavedBooksForUser({ controller, userId: user.id, token: user.token });
      setBooks(books);
    }

    fetchBook().catch(() => {
      setBooks([]);
    });
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="contentWrapper">
      <Head description={`${user.username} library`} title={`${user.username}`} />
      <h1 className="userPageTitle">Saved Books</h1>
      {books.length ? (
        <Swiper
          slidesPerView={width > 760 ? 2 : 1}
          simulateTouch={true}
          grabCursor={true}
          className="swiper"
          modules={[Navigation]}
          navigation={true}
        >
          {books.map(({ title, image, id, authors }: Book) => (
            <SwiperSlide className="swiperSlide" key={id}>
              <BookOverview title={title} image={image} authors={authors} id={id} key={id} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <h2>No Saved books</h2>
      )}
    </div>
  );
}
