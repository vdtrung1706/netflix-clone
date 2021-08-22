import { Link } from 'react-router-dom';

function NavMainMenuItems({ listItemsClassName }) {
  const className = `${listItemsClassName} hover:text-gray-400 transition-colors duration-200 ease-linear focus:font-bold focus:text-white`;

  return (
    <>
      <li>
        <Link to="/browse" className={className}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/browse/genre/83" className={className}>
          TV Shows
        </Link>
      </li>
      <li>
        <Link to="/browse/genre/83" className={className}>
          Movies
        </Link>
      </li>
      <li>
        <Link to="/lastest" className={className}>
          New & Popular
        </Link>
      </li>
      <li>
        <Link to="/browse/my-list" className={className}>
          My List
        </Link>
      </li>
    </>
  );
}

export default NavMainMenuItems;
