import { SearchBox } from '@components/common';
import { Profile } from '@components/layout';
import { Link } from 'react-router-dom';

export default function SecondaryNav() {
  return (
    <div className="flex items-center gap-3 ml-auto text-base">
      <SearchBox />

      <Link to="/kids" className="text-xs text-bold md:text-sm lg:text-sm">
        KIDS
      </Link>

      <Profile />
    </div>
  );
}
