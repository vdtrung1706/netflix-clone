import logoUrl from '../../assets/images/netflix-2015-logo.svg';
import profileDefaultUrl from '../../assets/images/profile-default.png';
import { useEffect, useState } from 'react';
import SearchBox from '../common/SearchBox';

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
      className={`fixed z-20 w-full h-16 top-0 text-sm bg-gradient-to-b from-black-pure transition ease-linear duration-400 ${
        fadedNav ? 'bg-black bg-none' : ''
      }`}
    >
      <div className="flex items-center h-full justify-between px-11">
        <div className="flex justify-start items-center">
          <a href="/" className="w-24">
            <img src={logoUrl} alt="Logo" />
          </a>
          <ul className="flex gap-4 items-center p-0 m-0 ml-9 text-shadow">
            <li>
              <a href="/" className="inline-block">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="inline-block">
                TV Shows
              </a>
            </li>
            <li>
              <a href="/" className="inline-block">
                Movies
              </a>
            </li>
            <li>
              <a href="/" className="inline-block">
                New & Popular
              </a>
            </li>
            <li>
              <a href="/" className="inline-block">
                My List
              </a>
            </li>
          </ul>
        </div>

        <div className="flex gap-3 items-center ml-auto">
          <SearchBox />
          <a href="/">KIDS</a>
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
