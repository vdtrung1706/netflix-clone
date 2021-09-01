import { NavLink } from 'react-router-dom';

export default function PrimaryNavItems({ listItemsClassName }) {
  const className = `${listItemsClassName} hover:text-gray-400 transition-colors duration-200 ease-linear focus:font-bold focus:text-white`;
  const activeClassName = 'font-bold cursor-default';

  return (
    <>
      <li>
        <NavLink
          exact
          to="/browse"
          className={className}
          activeClassName={activeClassName}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          exact
          to="/browse/tvshows"
          className={className}
          activeClassName={activeClassName}
        >
          TV Shows
        </NavLink>
      </li>

      <li>
        <NavLink
          exact
          to="/browse/movies"
          className={className}
          activeClassName={activeClassName}
        >
          Movies
        </NavLink>
      </li>

      <li>
        <NavLink
          exact
          to="/latest"
          className={className}
          activeClassName={activeClassName}
        >
          New & Popular
        </NavLink>
      </li>

      <li>
        <NavLink
          exact
          to="/browse/my-list"
          className={className}
          activeClassName={activeClassName}
        >
          My List
        </NavLink>
      </li>
    </>
  );
}
