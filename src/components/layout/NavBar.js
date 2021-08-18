import logoUrl from '../../assets/images/netflix-2015-logo.svg';
import profileDefaultUrl from '../../assets/images/profile-default.png';
import { useEffect, useState } from 'react';
import SearchBox from '../common/SearchBox';
import NavigationMenu from '../common/NavigationMenu';

const NavBar = () => {
  const [fadedNav, setFadedNav] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1) {
        setFadedNav(true);
      } else {
        setFadedNav(false);
      }
    });

    return () => {
      window.removeEventListener('scroll', null);
    };
  }, []);

  return (
    <nav
      className={`fixed z-20 w-full h-16 top-0 bg-gradient-to-b from-black-pure transition ease-linear duration-400 ${
        fadedNav ? 'bg-black-pure bg-none' : ''
      }`}
    >
      <div className="flex items-center h-full justify-between px-11">
        <div className="flex justify-start items-center">
          <a href="/" className="w-20 md:w-24">
            <img src={logoUrl} alt="Logo" />
          </a>
          <NavigationMenu />
        </div>

        <div className="flex text-base gap-3 items-center ml-auto">
          <SearchBox />
          <a href="/" className="text-bold text-xs md:text-sm lg:text-sm">
            KIDS
          </a>
          <div>
            <div>
              <img
                src={profileDefaultUrl}
                alt="Profile"
                className="max-w-10 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
