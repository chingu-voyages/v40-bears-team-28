import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./UserLibrary.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import { BookOverview } from "../../../../components/BookOverview";
import { Head } from "../../../../components/Head/Head";
import useWindowSize from "../../../../hooks/useWindowSize";

type apiResponse = {
  status: string;
  books: Book[];
  total: number;
};

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
    async function fetchBooks() {
      const response: apiResponse = await (await fetch("https://www.dbooks.org/api/recent")).json();
      setBooks(response.books);
    }
    fetchBooks();
  }, []);

  return (
    <div className="contentWrapper">
      <Head description={`${user.username} library`} title={`${user.username}`} />
      <h1 className="userPageTitle">Library</h1>
      <Swiper slidesPerView={width > 760 ? 2 : 1} simulateTouch={true} className="swiper">
        {books.map(({ title, image, id, authors }: Book) => (
          <SwiperSlide className="swiperSlide" key={id}>
            <BookOverview title={title} image={image} authors={authors} id={id} key={id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
