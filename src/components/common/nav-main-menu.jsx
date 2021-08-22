import { useEffect, useState } from 'react';
import { useViewport } from '../../hooks';
import { Link } from 'react-router-dom';
import NavMainMenuItems from './nav-main-menu-items';

import arrowDownUrl from '../../assets/icons/arrow-point-to-down.svg';
import arrowUpUrl from '../../assets/icons/arrow-point-to-up.svg';

function NarMainMenu() {
  const { width } = useViewport();
  const [expandedBrowse, setExpandedBrowse] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    width <= 890 ? setSmallScreen(true) : setSmallScreen(false);
  }, [width]);

  return (
    <ul className="flex gap-5 items-center p-0 m-0 ml-5 text-shadow md:ml-7 md:text-sm lg:ml-12">
      <li
        className={`text-xs list-none list-item transition-all ease-linear duration-400 ${
          smallScreen ? 'block' : 'hidden'
        }`}
      >
        <Link
          to="/"
          onClick={() => setExpandedBrowse(!expandedBrowse)}
          className="flex items-center h-full no-underline relative font-bold"
          role="button"
          aria-haspopup="true"
        >
          Browse
          <img className="ml-1 h-3" src={arrowDownUrl} alt={'browse'} />
        </Link>
        {expandedBrowse && (
          <div className="absolute bg-black-pure opacity-90 -ml-20 top-16">
            <div className="absolute left-1/2 -top-3 h-4 w-4">
              <img src={arrowUpUrl} alt={'browse'} />
            </div>
            <ul className="p-0 h-auto border-t-2 border-solid border-white">
              <NavMainMenuItems listItemsClassName="flex items-center justify-around leading-6 w-64 h-12" />
            </ul>
          </div>
        )}
      </li>

      <NavMainMenuItems
        listItemsClassName={`${smallScreen ? 'hidden' : 'block'}`}
      />
    </ul>
  );
}

export default NarMainMenu;
