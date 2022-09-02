import digitalMinimalism from '../../../assets/images/digital_minimalism.webp';
import readingNook from '../../../assets/images/readingNook.svg';
import './Landing.scss';

export const Landing = () => {
  return (
    <>
      <nav className="flex justify-end">
        <button className="secondary-btn">Sign In</button>
        <button className="primary-btn">Sign Up</button>
      </nav>
      <section className="flex justify-between section-container">
        <div className="hero__text">
          <h1 className="h1 heading">Find your next best book and read it all day.</h1>
          <p className="paragraph text-jungle-mist">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
            occaecati cupiditate non provident
          </p>
          <form action="" className="search-form bg-jungle-mist">
            <input type="search" name="search" id="" className="search-input " />
            <button type="submit" className="primary-btn search-btn">
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
            <img src={digitalMinimalism} alt="" />
            <div>
              <h4 className="heading h4">Digital Minimalism</h4>
              <p>Cal Newport</p>
            </div>
          </div>
          <div className="book-card flex justify-between">
            <img src={digitalMinimalism} alt="" />
            <div>
              <h4 className="heading h4">Digital Minimalism</h4>
              <p>Cal Newport</p>
            </div>
          </div>
          <div className="book-card flex justify-between">
            <img src={digitalMinimalism} alt="" />
            <div>
              <h4 className="heading  h4">Digital Minimalism</h4>
              <p className="paragraph">Cal Newport</p>
            </div>
          </div>
        </div>
      </section>
      <section className="book-of-the-week section-container bg-sherwood-green overlay flex stacked-flex">
        <div>
          <h3 className="heading h3">Book of the Week</h3>
          <p className="text-jungle-mist">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          </p>
          <div className="flex justify-between stats">
            <div className="text-center">
              <p className="heading h4">273</p>
              <p className="text-jungle-mist">Pages</p>
            </div>
            <div className="text-center">
              <p className="heading h4">4.5</p>
              <p className="text-jungle-mist">Stars</p>
            </div>
          </div>
        </div>
        <img src={digitalMinimalism} alt="" />
      </section>
      <footer className="text-center">
        <h3 className="heading h2">What are you waiting for?</h3>
        <p className="text-jungle-mist h4">Join the fastest growing community of bookworms</p>
        <div className="flex justify-center">
          <button className="secondary-btn">Sign In</button>
          <button className="primary-btn">Sign Up</button>
        </div>
      </footer>
    </>
  );
};
