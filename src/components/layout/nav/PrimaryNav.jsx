import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { NETFLIX_LOGO } from '@assets';
import useViewport from '@hooks/useViewport';
import cx from 'classnames';
import { AnimatePresence } from 'framer-motion';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavMenuCollapse = lazy(() => import('./NavMenuCollapse'));
const NavMenu = lazy(() => import('./NavMenu'));

function PrimaryNav() {
  const { width } = useViewport();
  const [open, setOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    width <= 890 ? setSmallScreen(true) : setSmallScreen(false);
  }, [width]);

  const hanldeExpanded = () => {
    setOpen((pre) => !pre);
  };

  return (
    <div className="flex items-center justify-start">
      <Link to="/" className="w-16 sm:w-20 md:w-24">
        <img src={NETFLIX_LOGO} alt="Logo" />
      </Link>
      <Suspense fallback={null}>
        <ul className="flex items-center gap-5 ml-5 text-shadow md:ml-7 md:text-sm lg:ml-12">
          <li
            className={cx('text-xs list-none list-item', {
              hidden: !smallScreen,
            })}
          >
            <button
              onClick={hanldeExpanded}
              className="relative flex items-center h-full sm:ml-1 lg:ml-2 text-0.7rem font-bold sm:text-xs md:text-sm"
            >
              Browse
              <ArrowDropDownIcon />
            </button>
            <AnimatePresence>
              {open && <NavMenuCollapse setOpen={setOpen} />}
            </AnimatePresence>
          </li>

          {!smallScreen && <NavMenu />}
        </ul>
      </Suspense>
    </div>
  );
}

export default React.memo(PrimaryNav);
