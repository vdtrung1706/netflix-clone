import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { selectCurrentUser } from '../../redux/selectors/userSelectors';
import { userSlice } from '../../redux/devtools/userSlice';
import { PROFILE_DEFAULT } from '../../assets';

export default function ProfileDropdown() {
  const currentUser = useSelector(selectCurrentUser);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(userSlice.actions.signOutStart());
  };

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

      <div
        name="accountMenuDropdown"
        className={cx(
          'absolute bg-black-pure bg-opacity-90 top-14 -ml-32 w-44 text-xs border-2 border-solid border-black-lighter border-opacity-30',
          {
            hidden: !expanded,
          }
        )}
      >
        <ul className="flex flex-col gap-2 px-2 py-3">
          <li className="hover:underline">
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

          <li className="hover:underline">
            <Link to="/kids" className="flex items-center justify-start gap-2">
              <img src={PROFILE_DEFAULT} alt="kids" className="w-8 rounded" />
              <span>Kids</span>
            </Link>
          </li>

          <li className="hover:underline">
            <Link to="/profiles/manage">Manage Profiles</Link>
          </li>
        </ul>

        <div className="h-1px bg-black-lighter bg-opacity-70"></div>

        <ul className="flex flex-col gap-2 px-2 py-3 h-auto">
          <li className="hover:underline">
            <Link to="/your-account">Your account</Link>
          </li>

          <li className="hover:underline">
            <Link to="/help-center">Help center</Link>
          </li>

          <li>
            <button onClick={handleSignOut} className="hover:underline">
              Sign out of Netflix
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
