import { PROFILE_DEFAULT } from '@assets';
import { selectCurrentUser } from '@store/auth/selectors.auth';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';

export default function Profile() {
  const currentUser = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col">
      <div className="flex items-center w-full">
        <button
          onClick={() => setOpen((pre) => !pre)}
          className="flex items-center"
        >
          <img
            src={currentUser?.photoURL ? currentUser.photoURL : PROFILE_DEFAULT}
            alt="profile"
            className="w-8 rounded"
          />
        </button>
        <span
          className="w-0 h-0 ml-1 border-t-4 border-l-4 border-r-4 border-solid"
          style={{
            borderColor: '#fff transparent transparent transparent',
          }}
        ></span>
      </div>

      <ProfileMenu currentUser={currentUser} open={open} setOpen={setOpen} />
    </div>
  );
}
