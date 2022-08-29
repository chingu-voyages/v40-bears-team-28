import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserLibrary.scss';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Head } from '../../../../components/Head/Head';
import { UserWrapper } from '../../../../components/UserWrapper/UserWrapper';

const mockUser = {
  id: 'id',
  username: 'AtomEistee',
  currentBooks: [
    {
      title: 'Atomic Habits',
      authors: 'Carl Newport',
      cover: 'link/to/cover.png',
      category: ['Fantasy', 'Drama'],
      description: 'Amazing description of amazing book, but who really knows?...',
      publisher: 'Publisher Name',
      publisherYear: 1920,
      id: 'UniqueID',
      pages: 89,
      isReading: true,
      isInCollection: false,
    },
  ],
};

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

export default function UserLibrary() {
  // there I thought making a request to server by that username, to get user books
  const { username } = useParams();
  console.log(username);
  const user = mockUser;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const response: apiResponse = await await (
        await fetch('https://www.dbooks.org/api/recent')
      ).json();
      setBooks(response.books);
    }
    fetchBooks();
  }, []);

  return (
    <UserWrapper>
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
    </UserWrapper>
  );
}
