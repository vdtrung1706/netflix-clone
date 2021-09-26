import SearchBox from '@components/common/SearchBox';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../content/Profile/Profile';

function SecondaryNav() {
  return (
    <div className="flex items-center gap-3 ml-auto text-base">
      <SearchBox />
      <Link
        to="/kids"
        className="text-0.7rem sm:text-xs text-bold md:text-sm lg:text-sm"
      >
        KIDS
      </Link>
      <Profile />
    </div>
  );
}

export default memo(SecondaryNav);
