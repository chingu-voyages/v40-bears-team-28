import "./Dashboard.scss";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { ReactComponent as BookListIcon } from "../../assets/images/booklist-icon.svg";
import { ReactComponent as BookmarkIcon } from "../../assets/images/bookmark-icon.svg";
import { ReactComponent as HomeIcon } from "../../assets/images/home-icon.svg";
import { ReactComponent as LogOutIcon } from "../../assets/images/log-out-icon.svg";
import useDebounce from "../../hooks/useDebounce";
import useLogout from "../../hooks/useLogout";

export const Dashboard = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedInput = useDebounce(searchInput, 600);
  const { logoutUser } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${debouncedInput}`);
    }
  }, [debouncedInput]);
  return (
    <div className="mainWrapper">
      <div className="secondaryWrapper">
        <header className="wrapperHeader">
          <input
            className="librarySearch"
            placeholder="Find your next favorite book"
            type={"search"}
            value={searchInput}
            onChange={(e) => setSearchInput(e.currentTarget.value)}
          />
        </header>
        <main className="wrapperMain">
          <Outlet />
        </main>
      </div>
      <footer className="wrapperFooter">
        <nav className="wrapperNavigation">
          <li className="navigationLink">
            <NavLink to={`home`}>
              <HomeIcon />
            </NavLink>
          </li>
          <div className="groupedLinks">
            <li className="navigationLink">
              <NavLink to={`library`}>
                <BookListIcon />
              </NavLink>
            </li>
            <li className="navigationLink">
              <NavLink to={`bookmarks`}>
                <BookmarkIcon />
              </NavLink>
            </li>
          </div>
          <li className="navigationLink">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
            <div onClick={logoutUser} role="button">
              <LogOutIcon />
            </div>
          </li>
        </nav>
      </footer>
    </div>
  );
};
