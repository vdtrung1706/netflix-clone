import { useEffect, useState } from 'react';
import PrimaryNav from '../common/PrimaryNav';
import SecondaryNav from '../common/SecondaryNav';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/selectors/userSelectors';
import cx from 'classnames';

const Nav = () => {
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
    <nav
      className={cx(
        'fixed z-20 h-16 top-0 right-0 left-0 bg-gradient-to-b from-black-pure transition ease-linear duration-400',
        {
          'bg-black-pure bg-none': fixedNav,
        }
      )}
    >
      <div className="flex items-center h-full justify-between px-4%">
        <PrimaryNav />
        <SecondaryNav currentUser={currentUser} />
      </div>
    </nav>
  );
};

export default Nav;
