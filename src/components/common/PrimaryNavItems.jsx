import { NavLink } from 'react-router-dom';

const PrimaryNavItems = ({ listItemsClassName }) => {
  const className = `${listItemsClassName} hover:text-gray-400 transition-colors duration-200 ease-linear focus:font-bold focus:text-white`;
  const activeClassName = 'font-bold cursor-default';

  return (
    <>
      <li>
        <NavLink
          to="/browse"
          className={className}
          activeClassName={activeClassName}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/browse/tvshows"
          className={className}
          activeClassName={activeClassName}
        >
          TV Shows
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/browse/movies"
          className={className}
          activeClassName={activeClassName}
        >
          Movies
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/latest"
          className={className}
          activeClassName={activeClassName}
        >
          New & Popular
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/browse/my-list"
          className={className}
          activeClassName={activeClassName}
        >
          My List
        </NavLink>
      </li>
    </>
  );
};

export default PrimaryNavItems;
