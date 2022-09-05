import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./UserLibrary.scss";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { getRecentBooks } from "../../../../api/dbooks.api";
import { BookOverview } from "../../../../components/BookOverview";
import { Head } from "../../../../components/Head/Head";
import useWindowSize from "../../../../hooks/useWindowSize";

type Book = {
  authors: string;
  id: string;
  image: string;
  subtitle: string;
  title: string;
  url: string;
};

type User = {
  username: string;
};

export default function UserLibrary() {
  const user = useOutletContext<User>();
  const { width } = useWindowSize();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchBooks() {
      const books = await getRecentBooks(controller);
      setBooks(books);
    }
    fetchBooks();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="contentWrapper">
      <Head description={`${user.username} library`} title={`${user.username}`} />
      <h1 className="userPageTitle">Library</h1>
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
