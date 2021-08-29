import SearchBox from './SearchBox';
import { Link } from 'react-router-dom';
import ProfileDropdown from './profileDropdown';

const SecondaryNav = () => {
  return (
    <div className="flex text-base gap-3 items-center ml-auto">
      <SearchBox />

      <Link to="/kids" className="text-bold text-xs md:text-sm lg:text-sm">
        KIDS
      </Link>

      <ProfileDropdown />
    </div>
  );
};

export default SecondaryNav;
