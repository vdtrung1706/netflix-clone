import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import ProfileDropdown from './ProfileDropdown';

export default function SecondaryNav() {
  return (
    <div
      name="secondaryNav"
      className="flex text-base gap-3 items-center ml-auto"
    >
      <SearchBox />

      <Link to="/kids" className="text-bold text-xs md:text-sm lg:text-sm">
        KIDS
      </Link>

      <ProfileDropdown />
    </div>
  );
}
