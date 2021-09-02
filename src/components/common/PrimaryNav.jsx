import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import PrimaryNavItems from './PrimaryNavItems';
import useViewport from '../../hooks/useViewport';
import { NETFLIX_LOGO, ARROW_POINT_DOWN } from '../../assets';
import NavItemsCollapse from './NavItemsCollapse';

export default function PrimaryNav() {
  const { width } = useViewport();
  const [expanded, setExpanded] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    width <= 890 ? setSmallScreen(true) : setSmallScreen(false);
  }, [width]);

  const hanldeExpanded = () => {
    setExpanded(pre => !pre);
  };

  return (
    <div name="primaryNav" className="flex justify-start items-center">
      <Link to="/" className="w-20 md:w-24">
        <img src={NETFLIX_LOGO} alt="Logo" />
      </Link>

      <ul
        name="navMenu"
        className="flex gap-5 items-center p-0 m-0 ml-5 text-shadow md:ml-7 md:text-sm lg:ml-12"
      >
        <li
          className={cx(
            'text-xs list-none list-item transition-all ease-linear duration-400',
            { hidden: !smallScreen }
          )}
        >
          <button
            onClick={hanldeExpanded}
            className="flex items-center h-full no-underline relative font-bold"
          >
            Browse
            <img src={ARROW_POINT_DOWN} alt="browse" className="ml-1 h-3" />
          </button>

          {expanded && <NavItemsCollapse setExpanded={setExpanded} />}
        </li>

        <PrimaryNavItems listItemsClassName={`${smallScreen && 'hidden'}`} />
      </ul>
    </div>
  );
}
