import React from 'react';
import { Link } from 'react-router-dom';
import './BookOverview.scss';

type BookOverviewProps = {
  image: string;
  title: string;
  authors: string;
  id: string;
};

export const BookOverview = ({ image, title, authors, id }: BookOverviewProps) => {
  return (
    <div className="bookWrapper">
      <img src={image} className="bookImg" alt={title} />
      <div className="bookText">
        <h2 className="bookTitle">{title}</h2>
        <span className="bookAuthors">{authors}</span>
        <Link className="bookLink" to={`/book/${id}`}>
          Continue reading
        </Link>
      </div>
    </div>
  );
};
