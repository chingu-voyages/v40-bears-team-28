import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import './UserLibrary.scss';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Head } from '../../../../components/Head/Head';

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

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const response: apiResponse = await (await fetch('https://www.dbooks.org/api/recent')).json();
      setBooks(response.books);
    }
    fetchBooks();
  }, []);

  return (
    <div className="contentWrapper">
      <Head description={`${user.username} library`} title={`${user.username}`} />
      <Swiper slidesPerView={1} simulateTouch={true} className="swiper">
        {books.map(({ title, image, id, authors }: Book) => (
          <SwiperSlide className="swiperSlide" key={id}>
            <img src={image} className="slideImg" alt={title} />
            <div className="slideText">
              <h2 className="slideTitle">{title}</h2>
              <span className="slideAuthors">{authors}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
