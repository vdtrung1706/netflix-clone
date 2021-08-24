import SearchBox from '../../common/search-box';
import profileDefaultUrl from '../../../assets/images/profile-default.png';

function SecondaryMenu({ currentUser }) {
  return (
    <div className="flex text-base gap-3 items-center ml-auto">
      <SearchBox />
      <a href="/" className="text-bold text-xs md:text-sm lg:text-sm">
        KIDS
      </a>
      <div>
        <div>
          <img
            src={currentUser ? currentUser.photoURL : profileDefaultUrl}
            alt="profile"
            className="w-8"
          />
        </div>
      </div>
    </div>
  );
}

export default SecondaryMenu;
