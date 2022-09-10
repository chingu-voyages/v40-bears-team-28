import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Algebra from "../../../../assets/images/Algebra.jpg";
import AzureMachineLearning from "../../../../assets/images/Azure-Machine-Learning.jpg";
import BecomingAScholar from "../../../../assets/images/Becoming-a-Scholar.jpg";
import MongoDB3Succinctly from "../../../../assets/images/MongoDB-3-Succinctly.jpg";
import readingNook from "../../../../assets/images/readingNook.svg";
import "./Landing.scss";
import { AuthContext } from "../../../../context/auth.context";

export const Landing = () => {
  const { setLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  function loginUser(event: React.MouseEvent<HTMLButtonElement>, order: boolean) {
    setLogin(order);
    navigate("/login");
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    navigate(`/search?q=${searchInput}`);
  }

  return (
    <>
      <nav className="flex justify-end">
        <button className="secondary-btn" onClick={(event) => loginUser(event, true)}>
          Sign In
        </button>
        <button className="primary-btn" onClick={(event) => loginUser(event, false)}>
          Sign Up
        </button>
      </nav>
      <section className="flex justify-between section-container">
        <div className="hero__text">
          <h1 className="h1 heading">Find your next best book and read it all day.</h1>
          <p className="paragraph text-jungle-mist">
            Having trouble finding time to read your favorite book? Books Hut is a free, big library
            with a wide range of books, from Philosophy to the Computer Science! All you have to do
            is create your account, add books to your personal library, and start reading!
          </p>
          <form
            action="@/features/misc/routes/LandingPage/Landing"
            className="search-form bg-jungle-mist"
          >
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.currentTarget.value)}
              name="search"
              id=""
              className="search-input "
            />
            <button type="button" onClick={handleClick} className="primary-btn search-btn">
              Search for books
            </button>
          </form>
        </div>
        <img src={readingNook} alt="" className="desktop-only" />
      </section>
      <section className="popular-books section-container bg-sherwood-green overlap">
        <h3 className="heading h3">Popular Books Right Now</h3>
        <div className="flex">
          <div className="book-card flex justify-between">
            <img src={MongoDB3Succinctly} alt="" />
            <div>
              <h4 className="heading h4">MongoDB 3 Succinctly</h4>
              <p>Zoran Maksimovic</p>
            </div>
          </div>
          <div className="book-card flex justify-between">
            <img src={BecomingAScholar} alt="" />
            <div>
              <h4 className="heading h4">Becoming a Scholar</h4>
              <p>Maria Savva, Lynn P. Nygaard</p>
            </div>
          </div>
          <div className="book-card flex justify-between">
            <img src={AzureMachineLearning} alt="" />
            <div>
              <h4 className="heading  h4">Azure Machine Learning</h4>
              <p className="paragraph">Jeff Barnes</p>
            </div>
          </div>
        </div>
      </section>
      <section className="book-of-the-week section-container bg-sherwood-green overlay flex stacked-flex">
        <div>
          <h3 className="heading h3">Book of the Week</h3>
          <p className="text-jungle-mist">
            This open book is an introduction to algebra for undergraduates who are interested in
            careers which require a strong background in mathematics. It will benefit students
            studying computer science and physical sciences, who plan to teach mathematics in
            schools, or to work in industry or finance.
          </p>
          <div className="flex justify-between stats">
            <div className="text-center">
              <p className="heading h4">419</p>
              <p className="text-jungle-mist paragraph">Pages</p>
            </div>
            {/* <div className="text-center">
              <p className="heading h4">4.5</p>
              <p className="text-jungle-mist paragraph">Stars</p>
            </div> */}
          </div>
        </div>
        <img src={Algebra} alt="" />
      </section>
      <footer className="text-center">
        <h3 className="heading h2">What are you waiting for?</h3>
        <p className="text-jungle-mist h4">Join the fastest growing community of bookworms</p>
        <div className="flex justify-center">
          <button className="secondary-btn" onClick={(event) => loginUser(event, true)}>
            Sign In
          </button>
          <button className="primary-btn" onClick={(event) => loginUser(event, false)}>
            Sign Up
          </button>
        </div>
      </footer>
    </>
  );
};
