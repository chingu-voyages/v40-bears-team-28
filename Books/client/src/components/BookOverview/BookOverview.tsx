import { Link } from "react-router-dom";
import "./BookOverview.scss";

type BookOverviewProps = {
  image: string;
  title: string;
  authors: string;
  id: string;
};

const decodeHtml = (text: string) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.innerText;
};

export const BookOverview = ({ image, title, authors, id }: BookOverviewProps) => {
  return (
    <div className="bookWrapper">
      <img src={image} className="bookImg" alt={decodeHtml(title)} />
      <div className="bookText">
        <h2 className="bookTitle">{decodeHtml(title)}</h2>
        <span className="bookAuthors">{decodeHtml(authors)}</span>
        <Link className="bookLink" to={`/book/${id}`}>
          Continue reading
        </Link>
      </div>
    </div>
  );
};
