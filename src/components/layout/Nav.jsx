import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle, signOut } from '../../firebase';
import PrimaryNav from '../common/PrimaryNav';
import SecondaryNav from '../common/SecondaryNav';

import logoUrl from '../../assets/images/netflix-2015-logo.svg';

const Nav = ({ currentUser }) => {
  const [fixedNav, setFixedNav] = useState(false);

  useEffect(() => {
    function handleFixedNav() {
      window.scrollY >= 1 ? setFixedNav(true) : setFixedNav(false);
    }

    window.addEventListener('scroll', handleFixedNav);

    return () => window.removeEventListener('scroll', handleFixedNav);
  }, []);

  return (
    <nav
      className={`fixed z-20 w-full h-16 top-0 bg-gradient-to-b from-black-pure transition ease-linear duration-400 ${
        fixedNav ? 'bg-black-pure bg-none' : ''
      }`}
    >
      <div className="flex items-center h-full justify-between px-4%">
        <div className="flex justify-start items-center">
          <Link to="/" className="w-20 md:w-24">
            <img src={logoUrl} alt="Logo" />
          </Link>
          <PrimaryNav />
          {currentUser ? (
            <button onClick={signOut}>Sign Out</button>
          ) : (
            <button onClick={signInWithGoogle}>Sign In With Google</button>
          )}
        </div>
        <SecondaryNav currentUser={currentUser} />
      </div>
    </nav>
  );
};

export default Nav;
