import React, { useContext, useEffect, useState } from "react";
import "./UserLibrary.scss";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { getRecentBooks } from "../../../../api/dbooks.api";
import { BookOverview } from "../../../../components/BookOverview";
import { Head } from "../../../../components/Head/Head";
import { AuthContext } from "../../../../context/auth.context";
import useWindowSize from "../../../../hooks/useWindowSize";
import { Book } from "../Types";

export function UserLibrary() {
  const { user } = useContext(AuthContext);
  const { width } = useWindowSize();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks() {
      const books = await getRecentBooks(controller);
      setBooks(books);
    }

    fetchBooks().catch(() => {
      setBooks([]);
    });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="contentWrapper">
      <Head description={`${user.username} library`} title={`${user.username}`} />
      <h1 className="userPageTitle">Recent Books</h1>
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
    </div>
  );
}
