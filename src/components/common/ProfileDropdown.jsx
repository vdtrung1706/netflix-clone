import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/selectors/userSelectors';
import { PROFILE_DEFAULT } from '../../assets';
import ProfileMenu from './ProfileMenu';

export default function ProfileDropdown() {
  const currentUser = useSelector(selectCurrentUser);
  const [expanded, setExpanded] = useState(false);

  return (
    <div name="accountMenu" className="relative flex flex-col">
      <div name="accountDropdown" className="flex items-center w-full">
        <button
          onClick={() => setExpanded(pre => !pre)}
          className="flex items-center"
        >
          <img
            src={currentUser?.photoURL ? currentUser.photoURL : PROFILE_DEFAULT}
            alt="profile"
            className="w-8 rounded"
          />
        </button>
        <span
          className="ml-1 w-0 h-0 border-solid border-t-4 border-r-4 border-l-4"
          style={{
            borderColor: '#fff transparent transparent transparent',
          }}
        ></span>
      </div>

      <ProfileMenu
        currentUser={currentUser}
        expanded={expanded}
        setExpanded={setExpanded}
      />
    </div>
  );
}
