import './UserWrapper.scss';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { ReactComponent as BookListIcon } from '../../assets/images/booklist-icon.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/images/bookmark-icon.svg';
import { ReactComponent as HomeIcon } from '../../assets/images/home-icon.svg';
import { ReactComponent as LogOutIcon } from '../../assets/images/log-out-icon.svg';

type UserWrapperProps = {
  children: React.ReactElement;
};

export const UserWrapper = ({ children }: UserWrapperProps) => {
  const { username } = useParams();
  return (
    <div className="userWrapper">
      <header className="userHeader">
        <input
          className="librarySearch"
          placeholder="Find your next favorite book"
          type={'search'}
        />
      </header>
      <main className="userMain">{children}</main>
      <footer className="userFooter">
        <nav className="userNavigation">
          <li className="navigationLink">
            <Link to={`/${username}/home`}>
              <HomeIcon />
            </Link>
          </li>
          <li className="navigationLink active">
            <Link to={`/${username}/library`}>
              <BookListIcon />
            </Link>
          </li>
          <li className="navigationLink">
            <Link to={`/${username}/bookmarks`}>
              <BookmarkIcon />
            </Link>
          </li>
          <li className="navigationLink">
            <Link to={`/${username}/logout`}>
              <LogOutIcon />
            </Link>
          </li>
        </nav>
      </footer>
    </div>
  );
};
