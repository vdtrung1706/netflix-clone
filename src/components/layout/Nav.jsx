import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryNav from '../common/PrimaryNav';
import SecondaryNav from '../common/SecondaryNav';
import logoUrl from '../../assets/images/netflix-2015-logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/selectors/userSelectors';
import { userActions } from '../../redux/devtools/userSlice';

const Nav = () => {
  const [fixedNav, setFixedNav] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    function handleFixedNav() {
      window.scrollY >= 1 ? setFixedNav(true) : setFixedNav(false);
    }

    window.addEventListener('scroll', handleFixedNav);

    return () => window.removeEventListener('scroll', handleFixedNav);
  }, []);

  const handleSignOut = () => {
    dispatch(userActions.signOutStart());
  };

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

          <button onClick={handleSignOut}>Sign Out</button>
        </div>
        <SecondaryNav currentUser={currentUser} />
      </div>
    </nav>
  );
};

export default Nav;
