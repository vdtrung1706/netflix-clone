import logoUrl from '../../assets/images/netflix-2015-logo.svg';
import profileDefaultUrl from '../../assets/images/profile-default.png';
import searchIcon from '../../assets/icons/search-icon.svg';

const Header = () => {
  return (
    <nav className="absolute z-10 w-full h-16 top-0 bg-gradient-to-b from-black-pure text-sm">
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
          <div className="flex items-center bg-black bg-opacity-80 border-white border-solid border">
            <input
              className="p-2 mr-4 bg-transparent outline-none"
              placeholder="Title, people, genres"
            />
            <img className="h-6 w-6" src={searchIcon} alt="Search" />
          </div>
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

export default Header;
