import { KIDS, PROFILE_DEFAULT } from '@assets';
import { authActions } from '@store/auth/slice.auth';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ProfileMenu({ currentUser }) {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(authActions.signOutStart());
  };

  return (
    <div className="text-xs font-normal border-2 border-opacity-50 border-solid bg-black-pure bg-opacity-70 w-36 sm:w-48 lg:text-sm border-black-lighter">
      <ul className="flex flex-col gap-2 px-2 py-3">
        <li className="hover:underline max-w-max">
          <Link
            to="/profiles/manage/1001"
            className="flex items-center justify-start gap-2"
          >
            <img
              src={
                currentUser?.photoURL ? currentUser.photoURL : PROFILE_DEFAULT
              }
              alt="profile"
              className="w-8 rounded"
            />
            <span>{currentUser.displayName}</span>
          </Link>
        </li>
        <li className="hover:underline max-w-max">
          <Link to="/kids" className="flex items-center justify-start gap-2">
            <img src={KIDS} alt="kids" className="w-8 rounded" />
            <span>Kids</span>
          </Link>
        </li>
        <li className="hover:underline max-w-max">
          <Link to="/profiles/manage">Manage Profiles</Link>
        </li>
      </ul>
      <div className="h-1px bg-black-lighter bg-opacity-70"></div>
      <ul className="flex flex-col h-auto gap-2 px-2 py-3">
        <li className="hover:underline max-w-max">
          <Link to="/your-account">Your account</Link>
        </li>
        <li className="hover:underline max-w-max">
          <Link to="/help-center">Help center</Link>
        </li>
        <li className="max-w-max hover:underline">
          <button onClick={handleSignOut}>Sign out of Netflix</button>
        </li>
      </ul>
    </div>
  );
}
