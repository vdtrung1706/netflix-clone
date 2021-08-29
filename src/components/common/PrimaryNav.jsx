import { useEffect, useState } from 'react';
import useViewport from '../../hooks/useViewport';
import PrimaryNavItems from './PrimaryNavItems';
import logoUrl from '../../assets/images/netflix-2015-logo.svg';
import arrowDownUrl from '../../assets/icons/arrow-point-to-down.svg';
import arrowUpUrl from '../../assets/icons/arrow-point-to-up.svg';
import { Link } from 'react-router-dom';
import cx from 'classnames';

const PrimaryNav = () => {
  const { width } = useViewport();
  const [expanded, setExpanded] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    width <= 890 ? setSmallScreen(true) : setSmallScreen(false);
  }, [width]);

  return (
    <div className="flex justify-start items-center">
      <Link to="/" className="w-20 md:w-24">
        <img src={logoUrl} alt="Logo" />
      </Link>

      <ul className="flex gap-5 items-center p-0 m-0 ml-5 text-shadow md:ml-7 md:text-sm lg:ml-12">
        <li
          className={cx(
            'text-xs list-none list-item transition-all ease-linear duration-400',
            { hidden: !smallScreen }
          )}
        >
          <button
            onClick={() => setExpanded(pre => !pre)}
            className="flex items-center h-full no-underline relative font-bold"
          >
            Browse
            <img src={arrowDownUrl} alt="browse" className="ml-1 h-3" />
          </button>

          {expanded && (
            <div className="absolute bg-black-pure opacity-90 -ml-20 top-16">
              <div className="absolute left-1/2 -top-3 h-4 w-4">
                <img src={arrowUpUrl} alt={'browse'} />
              </div>
              <ul className="p-0 h-auto border-t-2 border-solid border-white">
                <PrimaryNavItems listItemsClassName="flex items-center justify-around leading-6 w-64 h-12" />
              </ul>
            </div>
          )}
        </li>

        <PrimaryNavItems listItemsClassName={`${smallScreen && 'hidden'}`} />
      </ul>
    </div>
  );
};

export default PrimaryNav;
