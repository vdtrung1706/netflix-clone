import { ARROW_POINT_DOWN, NETFLIX_LOGO } from '@assets';
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
      <Link to="/" className="w-20 md:w-24">
        <img src={NETFLIX_LOGO} alt="Logo" />
      </Link>
      <Suspense fallback={null}>
        <ul className="flex items-center gap-5 p-0 m-0 ml-5 text-shadow md:ml-7 md:text-sm lg:ml-12">
          <li
            className={cx(
              'text-xs list-none list-item transition-all ease-linear duration-400',
              { hidden: !smallScreen },
            )}
          >
            <button
              onClick={hanldeExpanded}
              className="relative flex items-center h-full font-bold no-underline"
            >
              Browse
              <img src={ARROW_POINT_DOWN} alt="browse" className="h-3 ml-1" />
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
