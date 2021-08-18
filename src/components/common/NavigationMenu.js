/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState } from 'react';
import useViewport from '../../hooks/useViewport';
import arrowDownUrl from '../../assets/icons/arrow-point-to-down.svg';
import arrowUpUrl from '../../assets/icons/arrow-point-to-up.svg';

const ListItems = ({ listItemsClassName }) => {
  const className = `${listItemsClassName} hover:text-gray-400 transition-colors duration-200 ease-linear focus:font-bold focus:text-white`;
  return (
    <>
      <li>
        <a href="#" className={className}>
          Home
        </a>
      </li>
      <li>
        <a href="#" className={className}>
          TV Shows
        </a>
      </li>
      <li>
        <a href="#" className={className}>
          Movies
        </a>
      </li>
      <li>
        <a href="#" className={className}>
          New & Popular
        </a>
      </li>
      <li>
        <a href="#" className={className}>
          My List
        </a>
      </li>
    </>
  );
};

export default function NavigationMenu() {
  const { width } = useViewport();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (width <= 890) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, [width]);

  return (
    <ul className="flex gap-5 items-center p-0 m-0 ml-5 text-shadow md:ml-7 md:text-sm lg:ml-12">
      <li
        className={`text-xs list-none list-item transition-all ease-linear duration-400 ${
          isSmallScreen ? 'block' : 'hidden'
        }`}
      >
        <a
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center h-full no-underline relative font-bold"
          role="button"
          aria-haspopup="true"
        >
          Browse
          <img className="ml-1 h-3" src={arrowDownUrl} alt="Browse" />
        </a>
        {isExpanded && (
          <div className="absolute bg-black-pure opacity-90 -ml-20 top-16">
            <div className="absolute left-1/2 -top-3 h-4 w-4">
              <img src={arrowUpUrl} alt="Browse" />
            </div>
            <ul className="p-0 h-auto border-t-2 border-solid border-white">
              <ListItems listItemsClassName="flex items-center justify-around leading-6 w-64 h-12" />
            </ul>
          </div>
        )}
      </li>
      <ListItems listItemsClassName={`${isSmallScreen ? 'hidden' : 'block'}`} />
    </ul>
  );
}
