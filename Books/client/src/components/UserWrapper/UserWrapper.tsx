import './UserWrapper.scss';
import React from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';

import { ReactComponent as BookListIcon } from '../../assets/images/booklist-icon.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/images/bookmark-icon.svg';
import { ReactComponent as HomeIcon } from '../../assets/images/home-icon.svg';
import { ReactComponent as LogOutIcon } from '../../assets/images/log-out-icon.svg';

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

export const UserWrapper = () => {
  // there I thought making a request to server by that username, to get current user or something like that
  const user = mockUser;
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
      <main className="userMain">
        <Outlet context={user} />
      </main>
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
