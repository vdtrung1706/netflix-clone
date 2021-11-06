import { selectCurrentUser } from '@store/auth/selectors.auth';
import { navFadeInVariants } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import PrimaryNav from './PrimaryNav';
import SecondaryNav from './SecondaryNav';

export default function Nav() {
  const [fixedNav, setFixedNav] = useState(false);
  const location = useLocation();
  const inGenrePage = location.pathname.includes('genre');
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    function handleFixedNav() {
      window.scrollY >= 1 && !inGenrePage
        ? setFixedNav(true)
        : setFixedNav(false);
    }

    window.addEventListener('scroll', handleFixedNav);

    return () => window.removeEventListener('scroll', handleFixedNav);
  }, [inGenrePage]);

  return (
    <motion.nav
      variants={navFadeInVariants}
      initial="initial"
      animate="animate"
      className="fixed top-0 left-0 right-0 z-50 h-16"
    >
      <div
        className={cx('relative transition-all duration-200', {
          'bg-gradient-to-b from-black-pure': !inGenrePage,
          'bg-black': inGenrePage,
          'bg-black-pure': fixedNav,
        })}
      >
        <div className="flex items-center h-full justify-between px-4% ml-2px">
          <PrimaryNav />
          <SecondaryNav currentUser={currentUser} />
        </div>
      </div>
    </motion.nav>
  );
}
