import { Link } from 'react-router-dom';

const PrimaryNavItems = ({ listItemsClassName }) => {
  const className = `${listItemsClassName} hover:text-gray-400 transition-colors duration-200 ease-linear focus:font-bold focus:text-white`;

  return (
    <>
      <li>
        <Link to="/browse" className={className}>
          Home
        </Link>
      </li>

      <li>
        <Link to="/tvshows" className={className}>
          TV Shows
        </Link>
      </li>

      <li>
        <Link to="/movies" className={className}>
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
};

export default PrimaryNavItems;
