import React from 'react';
import { NavLink } from 'react-router-dom';

function NavMenu({ className }) {
  const commonClass = `${className} hover:text-gray-400 transition-colors duration-200 ease-linear focus:font-bold focus:text-white`;

  const activeClassName = 'font-bold cursor-default';

  return (
    <>
      <li>
        <NavLink
          exact
          to="/browse"
          className={commonClass}
          activeClassName={activeClassName}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/browse/tv"
          className={commonClass}
          activeClassName={activeClassName}
        >
          TV Shows
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/browse/movie"
          className={commonClass}
          activeClassName={activeClassName}
        >
          Movies
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/latest"
          className={commonClass}
          activeClassName={activeClassName}
        >
          New & Popular
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/browse/my-list"
          className={commonClass}
          activeClassName={activeClassName}
        >
          My List
        </NavLink>
      </li>
    </>
  );
}

export default React.memo(NavMenu);
