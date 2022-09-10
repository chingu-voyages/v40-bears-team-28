import React, { useContext, useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { getRandomCollection } from "../../../../api/dbooks.api";
import { BookOverview } from "../../../../components/BookOverview";
import { Head } from "../../../../components/Head/Head";
import { AuthContext } from "../../../../context/auth.context";
import useWindowSize from "../../../../hooks/useWindowSize";
import { Book } from "../Types";

export function LibraryPage() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState<Book[]>([]);
  const { width } = useWindowSize();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBook() {
      const books = await getRandomCollection(controller);
      setBooks(books);
    }

    fetchBook().catch(() => {
      setBooks([]);
    });
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
