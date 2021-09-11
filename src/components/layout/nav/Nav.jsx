import { selectCurrentUser } from '@store/auth/selectors.auth';
import { navFadeInVariants } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PrimaryNav from './PrimaryNav';
import SecondaryNav from './SecondaryNav';

export default function Nav() {
  const [fixedNav, setFixedNav] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    function handleFixedNav() {
      window.scrollY >= 1 ? setFixedNav(true) : setFixedNav(false);
    }

    window.addEventListener('scroll', handleFixedNav);

    return () => window.removeEventListener('scroll', handleFixedNav);
  }, []);

  return (
    <motion.nav
      variants={navFadeInVariants}
      initial="initial"
      animate="animate"
      className={cx(
        'fixed z-50 h-16 top-0 right-0 left-0 bg-gradient-to-b from-black-pure transition ease-linear duration-400',
        { 'bg-black-pure bg-none': fixedNav },
      )}
    >
      <div className="flex items-center h-full justify-between px-4%">
        <PrimaryNav />
        <SecondaryNav currentUser={currentUser} />
      </div>
    </motion.nav>
  );
}
