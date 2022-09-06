import React, { useEffect, useState } from "react";
import "./SearchPage.scss";
import { useSearchParams } from "react-router-dom";
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

export default function SearchPage() {
  const { width } = useWindowSize();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    async function fetchBooks() {
      const response: apiResponse = await (
        await fetch(`https://www.dbooks.org/api/search/${query}`)
      ).json();
      setBooks(response.books || []);
    }
    fetchBooks();
  }, [query]);

  return (
    <div className="contentWrapper">
      <Head description={`Search`} title={`Search`} />
      <h1 className="searchPageTitle text-center">
        {query ? `You searched for "${query}"` : "What are you looking for?"}
      </h1>
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
